import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPresenter from './DetailPresenter';
import { productsApi, usersApi } from 'api';
import Loader from 'Components/Loader';
import store from 'store';

const DetailContainer = () => {
  const [detailData, setDetailData] = useState({
    detail: '',
    check_favs: '',
    recent: [],
    reviews: [],
    qnas: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id: productId } = useParams();

  const getProductData = async () => {
    const { data: detail } = await productsApi.showDetail(productId);
    const { data: check_favs } = await usersApi.checkfavs(detail.id);
    const {
      data: { results: reviews },
    } = await productsApi.reviews(productId);
    const {
      data: { results: qnas },
    } = await productsApi.qnas(productId);
    const recent = store.getState()?.products.map((i) => i.product);
    return [detail, check_favs, reviews, qnas, recent];
  };

  const getData = async () => {
    try {
      const [
        detail,
        check_favs,
        reviews,
        qnas,
        recent,
      ] = await getProductData();
      setDetailData({
        detail,
        check_favs,
        recent,
        reviews,
        qnas,
      });
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return loading ? (
    <Loader />
  ) : (
    <DetailPresenter {...detailData} error={error} />
  );
};

export default DetailContainer;
