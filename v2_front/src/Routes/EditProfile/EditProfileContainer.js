import React, { useState, useEffect } from 'react';
import EditProfilePresenter from './EditProfilePresenter';
import { usersApi } from 'api';
import Loader from 'Components/Loader';

const EditProfileContainer = () => {
  const [editProfileData, setEditProfileData] = useState({
    user: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const { data: user } = await usersApi.user();
      setEditProfileData({
        user: user,
      });
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { user } = editProfileData;

  return loading ? (
    <Loader />
  ) : (
    <EditProfilePresenter user={user} error={error} />
  );
};

export default EditProfileContainer;
