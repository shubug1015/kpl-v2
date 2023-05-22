import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SearchPresenter from './SearchPresenter';
import { searchApi } from 'api';
import Loader from 'Components/Loader';
import getQueryStringObject from 'Components/getQueryStringObject';

const SearchContainer = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState({
    searchTerm: null,
    page: null,
    filter: null,
    searchResults: [],
    itemNum: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getItems = async (searchTerm, pageNum, filterOption) => {
    var {
      data: { results: searchResults, count: itemNum },
    } = await searchApi.search(searchTerm, pageNum, filterOption);
    setSearchData({
      searchTerm: searchTerm,
      page: pageNum,
      filter: filterOption,
      searchResults: searchResults,
      itemNum: itemNum,
    });
  };

  const getData = async (searchTerm, pageNum, filterOption) => {
    try {
      getItems(searchTerm, pageNum, filterOption);
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
    const searchTerm = qs.search;
    const { pathname: pagePath } = location;
    if (isMount.current) {
      // mount
      getData(searchTerm, pageNum, filterOption, pagePath);
      isMount.current = false;
      return;
    } else {
      //update
      getData(searchTerm, pageNum, filterOption, pagePath);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const { searchTerm, searchResults, itemNum } = searchData;

  return loading ? (
    <Loader />
  ) : (
    <SearchPresenter
      searchTerm={searchTerm}
      searchResults={searchResults}
      itemNum={itemNum}
      error={error}
    />
  );
};

export default SearchContainer;
