import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PurchasePresenter from './PurchasePresenter';
import Loader from 'Components/Loader';
import { managersApi } from 'api';
import getQueryStringObject from 'Components/getQueryStringObject';

const QnAContainer = () => {
  const [purchaseData, setPurchaseData] = useState({
    toSendPurchase: null,
    sendedPurchase: null,
    exchange: null,
    refund: null,
    toSendNum: null,
    sendedNum: null,
    exchangeNum: null,
    refundNum: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);

  const location = useLocation();

  const submitSend = async (event) => {
    event.preventDefault();
    setSubmit(!submit);
    try {
      await managersApi.completeSend(event.target.id);
    } catch {
      alert('Error');
    }
  };

  const submitExchange = async (event) => {
    event.preventDefault();
    setSubmit(!submit);
    try {
      await managersApi.completeExchange(event.target.id);
    } catch {
      alert('Error');
    }
  };

  const submitRefund = async (event) => {
    event.preventDefault();
    setSubmit(!submit);
    try {
      await managersApi.completeRefund(event.target.id);
    } catch {
      alert('Error');
    }
  };

  const getItems = async (pageNum) => {
    const {
      data: { count: toSendNum, results: toSendPurchase },
    } = await managersApi.purchase(pageNum, false);
    const {
      data: { count: sendedNum, results: sendedPruchase },
    } = await managersApi.purchase(pageNum, true);
    const {
      data: { count: exchangeNum, results: exchange },
    } = await managersApi.exchange(pageNum);
    const {
      data: { count: refundNum, results: refund },
    } = await managersApi.refund(pageNum);
    setPurchaseData({
      toSendPurchase: toSendPurchase,
      sendedPurchase: sendedPruchase,
      exchange: exchange,
      refund: refund,
      toSendNum: toSendNum,
      sendedNum: sendedNum,
      exchangeNum: exchangeNum,
      refundNum: refundNum,
    });
  };

  const getData = (pageNum) => {
    try {
      getItems(pageNum);
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
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, submit]);

  const {
    toSendPurchase,
    sendedPurchase,
    exchange,
    refund,
    toSendNum,
    sendedNum,
    exchangeNum,
    refundNum,
  } = purchaseData;

  return loading ? (
    <Loader />
  ) : (
    <PurchasePresenter
      toSendPurchase={toSendPurchase}
      sendedPurchase={sendedPurchase}
      exchange={exchange}
      refund={refund}
      submitSend={submitSend}
      submitExchange={submitExchange}
      submitRefund={submitRefund}
      toSendNum={toSendNum}
      sendedNum={sendedNum}
      exchangeNum={exchangeNum}
      refundNum={refundNum}
      error={error}
    />
  );
};

export default QnAContainer;
