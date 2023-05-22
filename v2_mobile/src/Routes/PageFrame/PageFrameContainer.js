import React, { Component } from "react";
import { connect } from "react-redux";
import PageFramePresenter from "./PageFramePresenter";
import Loader from "Components/Loader";
import { productsApi } from "api";
import { pageNum, filterOption } from "store";

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

class PageFrameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: qs.page,
      filter: qs.filter,
      error: null,
      loading: true,
      section: "",
      itemNum: null,
      url: null,
    };

    this.getItems = async (pageNum, filterOption) => {
      var {
        data: { count: itemNum, results: items },
      } = await productsApi.apiProducts(pageNum, filterOption);
      if (this.state.items !== items) {
        this.setState({
          items,
          itemNum,
          url: new URL(
            "http://localhost:3000" +
              this.props.location.pathname +
              this.props.location.search
          ),
        });
      }
    };

    this.data_func = async (pageNum, filterOption) => {
      try {
        this.getItems(pageNum, filterOption);
      } catch {
        this.setState({
          error: "정보를 불러올 수 없습니다.",
          itemNum: -1,
          url: new URL(
            "http://localhost:3000" +
              this.props.location.pathname +
              this.props.location.search
          ),
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    };
  }

  async componentDidMount() {
    qs = getQueryStringObject();
    const pageNum = qs.page;
    const filterOption = qs.filter;
    this.props.getPageNum(pageNum);
    this.props.getFilterOption(filterOption);

    this.data_func(pageNum, filterOption);
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
      const pageNum = qs.page;
      const filterOption = qs.filter;

      this.getItems(pageNum, filterOption);
    }
  }

  render() {
    const { items, itemNum, error, loading, section, url } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <PageFramePresenter
        items={items}
        itemNum={itemNum}
        error={error}
        loading={loading}
        section={section}
        url={url}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPageNum: (data) => dispatch(pageNum(data)),
    getFilterOption: (data) => dispatch(filterOption(data)),
  };
};

export default connect(null, mapDispatchToProps)(PageFrameContainer);
