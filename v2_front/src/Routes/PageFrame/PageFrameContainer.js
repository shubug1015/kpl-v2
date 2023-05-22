import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageFramePresenter from './PageFramePresenter';
import Loader from 'Components/Loader';
import { productsApi } from 'api';
import getQueryStringObject from 'Components/getQueryStringObject';

const PageFrameContainer = () => {
  const [pageFrameData, setPageFrameData] = useState({
    items: null,
    itemNum: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const url = 'http://localhost:3000' + location.pathname + location.search;

  const getItems = async (pageNum, filterOption) => {
    var {
      data: { count: itemNum, results: item },
    } = await productsApi.apiProducts(pageNum, filterOption);
    if (items !== item) {
      setPageFrameData({
        items: item,
        itemNum: itemNum,
      });
    }
  };

  const getData = (pageNum, filterOption) => {
    try {
      getItems(pageNum, filterOption);
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  const isMount = useRef(true);
  useEffect(() => {
    const qs = getQueryStringObject();
    const pageNum = qs.page;
    const filterOption = qs.filter;
    if (isMount.current) {
      // mount
      getData(pageNum, filterOption);
      isMount.current = false;
      return;
    } else {
      //update
      getData(pageNum, filterOption);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { items, itemNum } = pageFrameData;

  return loading ? (
    <Loader />
  ) : (
    <PageFramePresenter
      items={items}
      itemNum={itemNum}
      error={error}
      url={url}
    />
  );
};

export default PageFrameContainer;
