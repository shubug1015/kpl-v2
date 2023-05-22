import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BasketPresenter from './BasketPresenter';
import { usersApi } from 'api';
import Loader from 'Components/Loader';
import store from 'store';

const BasketContainer = () => {
  const [basketData, setBasketData] = useState({
    user: null,
    basket: null,
    basketObjectId: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const basketObjectId_props = useLocation().state;

  const getItems = async () => {
    const { data: user } = await usersApi.user();
    const {
      data: { results },
    } = await usersApi.basket(store.getState().user?.token);
    const basket = results.map((basket) => {
      basket.product.option = basket.option;
      basket.product.qty = basket.qty;
      basket.product.productId = basket.product.id;
      basket.product.id = basket.id;
      return basket.product;
    });
    setBasketData({
      user,
      basket,
      basketObjectId: false,
    });
    if (basketObjectId_props !== undefined) {
      setBasketData({
        user,
        basket,
        basketObjectId: basketObjectId_props.basketObjectId,
      });
    }
  };

  const getData = async () => {
    try {
      await getItems();
    } catch {
      setError('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <BasketPresenter {...basketData} error={error} />
  );
};

export default BasketContainer;
