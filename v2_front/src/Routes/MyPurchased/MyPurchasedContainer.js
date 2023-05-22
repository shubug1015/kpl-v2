import React, { useState, useEffect } from 'react';
import MyPurchasedPresenter from './MyPurchasedPresenter';
import { useLocation } from 'react-router-dom';
import { usersApi } from 'api';
import Loader from 'Components/Loader';
import getQueryStringObject from 'Components/getQueryStringObject';

const MyPurchasedContainer = () => {
  const [purchasedData, setPurchasedData] = useState({
    purchased: null,
    exchange: null,
    refund: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getItems = async (pageNum) => {
    console.log(pageNum);
    const {
      data: { count: itemNum, results: purchased },
    } = await usersApi.purchasedList(pageNum);
    const {
      data: { results: exchange },
    } = await usersApi.exchangedList();
    const {
      data: { results: refund },
    } = await usersApi.refundedList();
    setPurchasedData({
      purchased: purchased,
      exchange: exchange,
      refund: refund,
      itemNum: itemNum,
    });
  };

  const getData = async (pageNum) => {
    try {
      await getItems(pageNum);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qs = getQueryStringObject();
    const pageNum = qs.page;
    getData(pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { purchased, itemNum, exchange, refund } = purchasedData;

  return loading ? (
    <Loader />
  ) : (
    <MyPurchasedPresenter
      purchased={purchased}
      exchange={exchange}
      refund={refund}
      itemNum={itemNum}
      error={error}
    />
  );
};

export default MyPurchasedContainer;
