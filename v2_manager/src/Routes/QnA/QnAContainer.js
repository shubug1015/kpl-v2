import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QnAPresenter from './QnAPresenter';
import Loader from 'Components/Loader';
import { managersApi } from 'api';
import getQueryStringObject from 'Components/getQueryStringObject';

const QnAContainer = () => {
  const [qnaData, setQnaData] = useState({
    manager: null,
    items: null,
    itemNum: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState(false);

  const location = useLocation();

  const getItems = async (pageNum) => {
    const { data: manager } = await managersApi.manager();
    const {
      data: { count: itemNum, results: item },
    } = await managersApi.qnaProduct(pageNum, false);
    if (items !== item) {
      setQnaData({
        manager: manager,
        items: item,
        itemNum: itemNum,
      });
    }
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

  const removeQnA = () => {
    setRemove(true);
  };

  useEffect(() => {
    const qs = getQueryStringObject();
    const pageNum = qs.page;
    getData(pageNum);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, remove]);

  const { manager, items, itemNum } = qnaData;

  return loading ? (
    <Loader />
  ) : (
    <QnAPresenter
      manager={manager}
      items={items}
      itemNum={itemNum}
      removeQnA={removeQnA}
      error={error}
    />
  );
};

export default QnAContainer;
