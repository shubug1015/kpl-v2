import React, { Component } from "react";
import SearchPresenter from "./SearchPresenter";
import { searchApi } from "api";
import Loader from "Components/Loader";
import store, { searchTerm, pageNum, filterOption } from "store";
import { connect } from "react-redux";

function getQueryStringObject() {
  var a = window.location.search.substr(1).split("&");
  if (a === "") return {};
  var b = {};
  for (var i = 0; i < a.length; ++i) {
    var p = a[i].split("=", 2);
    if (p.length === 1) b[p[0]] = "";
    else b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
}
var qs = getQueryStringObject();

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: qs.search,
      page: qs.page,
      filter: qs.filter,
      searchResults: [],
      searchTerm: store.getState()?.search,
      loading: true,
      error: null,
      itemNum: null,
    };

    this.getItems = async (searchTerm, pageNum, filterOption) => {
      var {
        data: { count: itemNum, results: items },
      } = await searchApi.search(searchTerm, pageNum, filterOption);
      if (this.state.items !== items) {
        this.setState({
          items,
          itemNum,
        });
      }
    };

    this.search_func = async (searchTerm, pageNum, filterOption) => {
      try {
        const {
          data: { results: searchResults, count: itemNum },
        } = await searchApi.search(searchTerm, pageNum, filterOption);

        this.setState({
          searchResults,
          itemNum,
        });
      } catch {
        this.setState({
          error: "검색결과를 찾을 수 없어요 :(",
          itemNum: -1,
        });
      } finally {
        this.setState({ loading: false });
      }
    };

    store.subscribe(() => {
      if (store.getState()?.search !== this.state.searchTerm) {
        this.setState({ page: 1, searchTerm: store.getState()?.search }, () => {
          var pageNum = this.state.page;
          var searchTerm = this.state.searchTerm;
          var filterOption = this.state.filter;
          this.search_func(searchTerm, pageNum, filterOption);
        });
      } else if (store.getState()?.page !== this.state.page) {
        this.setState({ page: store.getState()?.page }, () => {
          var pageNum = this.state.page;
          var searchTerm = this.state.searchTerm;
          var filterOption = this.state.filter;
          this.search_func(searchTerm, pageNum, filterOption);
        });
      } else if (store.getState()?.filter !== this.state.filter) {
        this.setState({ page: 1, filter: store.getState()?.filter }, () => {
          var pageNum = this.state.page;
          var searchTerm = this.state.searchTerm;
          var filterOption = this.state.filter;
          this.search_func(searchTerm, pageNum, filterOption);
        });
      }
    });
  }

  async componentDidMount() {
    qs = getQueryStringObject();
    const pageNum = qs.page;
    const filterOption = qs.filter;
    const searchTerm = qs.search;
    this.props.getPageNum(pageNum);
    this.props.getFilterOption(filterOption);
    this.props.getSerachTerm(searchTerm);
    const {
      location: { pathname: pagePath },
    } = this.props;
    this.search_func(searchTerm, pageNum, filterOption, pagePath);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      qs = getQueryStringObject();
      if (this.state.page !== qs.page) {
        this.props.getPageNum(qs.page);
      }
      if (this.state.filter !== qs.filter) {
        this.props.getFilterOption(qs.filter);
      }
      if (this.state.search !== qs.search) {
        this.props.getSerachTerm(qs.search);
      }
      const pageNum = qs.page;
      const filterOption = qs.filter;
      const searchTerm = qs.search;
      const {
        location: { pathname: pagePath },
      } = this.props;
      this.getItems(searchTerm, pageNum, filterOption, pagePath);
    }
  }

  render() {
    const { searchResults, loading, error, itemNum } = this.state;

    return loading ? (
      <Loader />
    ) : (
      <SearchPresenter
        searchResults={searchResults}
        loading={loading}
        error={error}
        itemNum={itemNum}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPageNum: (data) => dispatch(pageNum(data)),
    getFilterOption: (data) => dispatch(filterOption(data)),
    getSerachTerm: (data) => dispatch(searchTerm(data)),
  };
};

export default connect(null, mapDispatchToProps)(SearchContainer);
