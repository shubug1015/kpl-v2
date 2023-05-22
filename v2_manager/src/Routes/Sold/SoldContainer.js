import React, { useState, useEffect } from 'react';
import SoldPresenter from './SoldPresenter';
import Loader from 'Components/Loader';
import { managersApi } from 'api';

const SoldContainer = () => {
  const [soldData, setSoldData] = useState({
    items: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    const { data: items } = await managersApi.monthReport();
    setSoldData({
      items: items,
    });
  };

  const getData = async () => {
    try {
      await getItems();
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { items } = soldData;

  return loading ? <Loader /> : <SoldPresenter items={items} error={error} />;
};

export default SoldContainer;
