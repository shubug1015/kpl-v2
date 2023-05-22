import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyProductPresenter from './MyProductPresenter';
import Loader from 'Components/Loader';
import { managersApi } from 'api';
import getQueryStringObject from 'Components/getQueryStringObject';

const MyProductContainer = () => {
  const [myProductData, setMyProductData] = useState({
    manager: null,
    items: null,
    itemNum: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const getItems = async (pageNum, filterOption) => {
    const { data: manager } = await managersApi.manager();
    const {
      data: { count: itemNum, results: item },
    } = await managersApi.myProducts(pageNum, filterOption);
    if (items !== item) {
      setMyProductData({
        manager: manager,
        items: item,
        itemNum: itemNum,
      });
    }
  };

  const getData = async (pageNum, filterOption) => {
    try {
      await getItems(pageNum, filterOption);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const qs = getQueryStringObject();
    const pageNum = qs.page;
    const filterOption = qs.filter;
    getData(pageNum, filterOption);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { manager, items, itemNum } = myProductData;

  return loading ? (
    <Loader />
  ) : (
    <MyProductPresenter
      manager={manager}
      items={items}
      itemNum={itemNum}
      error={error}
    />
  );
};

export default MyProductContainer;
