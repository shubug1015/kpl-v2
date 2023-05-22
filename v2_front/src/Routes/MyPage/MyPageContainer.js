import React, { useState, useEffect } from 'react';
import MyPagePresenter from './MyPagePresenter';
import { usersApi } from 'api';
import Loader from 'Components/Loader';

const MyPageContainer = () => {
  const [myPageData, setMyPageData] = useState({
    user: null,
    basket: null,
    like: null,
    purchase: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data: user } = await usersApi.user();
      const {
        data: { results: basket },
      } = await usersApi.basket();
      const {
        data: { results: like },
      } = await usersApi.favs(1);
      const {
        data: { results: purchase },
      } = await usersApi.purchasedList(1);
      setMyPageData({
        user: user,
        basket: basket,
        like: like,
        purchase: purchase,
      });
    } catch {
      setError("can't find anything");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { user, basket, like, purchase } = myPageData;

  return loading ? (
    <Loader />
  ) : (
    <MyPagePresenter
      user={user}
      basket={basket}
      like={like}
      purchase={purchase}
      error={error}
    />
  );
};

export default MyPageContainer;
