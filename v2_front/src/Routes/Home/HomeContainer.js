import React from 'react';
// import React, { useState } from 'react';
import HomePresenter from './HomePresenter';
// import Loader from 'Components/Loader';

const MyPageContainer = () => {
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const getData = async () => {
  //   try {

  //   } catch {
  //     setError("can't find anything");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return loading ? <Loader /> : <HomePresenter error={error} />;
  return <HomePresenter />;
};

export default MyPageContainer;
