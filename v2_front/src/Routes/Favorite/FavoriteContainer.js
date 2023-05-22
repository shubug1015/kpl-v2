import React, { useState, useEffect } from 'react';
import FavoritePresenter from './FavoritePresenter';
import { useLocation } from 'react-router-dom';
import { usersApi } from 'api';
import Loader from 'Components/Loader';
import getQueryStringObject from 'Components/getQueryStringObject';

const FavoriteContainer = () => {
  const [favoriteData, setFavoriteData] = useState({
    like: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getItems = async (pageNum) => {
    const {
      data: { count: itemNum, results: like },
    } = await usersApi.favs(pageNum);
    setFavoriteData({
      like: like,
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

  const { like, itemNum } = favoriteData;

  return loading ? (
    <Loader />
  ) : (
    <FavoritePresenter like={like} itemNum={itemNum} error={error} />
  );
};

export default FavoriteContainer;
