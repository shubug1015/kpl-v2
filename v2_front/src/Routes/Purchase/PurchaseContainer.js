import React, { useState, useEffect } from 'react';
import PurchasePresenter from './PurchasePresenter';
import Loader from 'Components/Loader';
import { usersApi } from 'api';
import { useLocation } from 'react-router-dom';

const PurchaseContainer = () => {
  const [purchaseData, setPurchaseData] = useState({
    checkedBasket: [],
    user: null,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const { checkedBasket, user, error } = purchaseData;
  const checkedBasket_props = useLocation().state;

  useEffect(() => {
    const getData = async () => {
      try {
        const { checkedBasket } = checkedBasket_props;
        const { data: user } = await usersApi.user();
        setPurchaseData({
          checkedBasket: checkedBasket,
          user: user,
          error: null,
        });
      } catch {
        setPurchaseData({
          checkedBasket: [],
          user: null,
          error: "Can't find anything.",
        });
      } finally {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <PurchasePresenter
      checkedBasket={checkedBasket}
      user={user}
      error={error}
    />
  );
};

export default PurchaseContainer;
