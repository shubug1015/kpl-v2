import React from "react";
import styled from "styled-components";
import store, { pageNum, filterOption } from "store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const FilterContainer = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 140px;
`;

const QtyConainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  font-weight: 900;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  font-size: 11px;
  /* opacity: 0.7; */
  padding: 0px 5px;
  cursor: pointer;
`;

const Divider = styled.span`
  font-size: 10px;
  opacity: 0.5;
`;

const Filter = ({ itemNum, getSearchTerm, getPageNum, getFilterOption }) => {
  const history = useHistory();

  const urlSearchNow = history.location.search;
  const getFilter = (event) => {
    getPageNum(1);
    getFilterOption(event.target.id);
    const pathurl = history.location.pathname;
    const search = store.getState()?.search;
    const page = store.getState()?.page;
    const filter = store.getState()?.filter;
    if (urlSearchNow.includes("search")) {
      history.push(`${pathurl}?search=${search}&filter=${filter}&page=${page}`);
    } else {
      history.push(`${pathurl}?filter=${filter}&page=${page}`);
    }
  };

  const filterStore = store.getState()?.filter;

  return (
    <FilterContainer>
      <QtyConainer>총 {itemNum}개 상품</QtyConainer>
      <BtnContainer>
        <Btn
          onClick={getFilter}
          id="new"
          style={{ opacity: filterStore === "new" ? 0.6 : 1 }}
        >
          신상품순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id="popularity"
          style={{ opacity: filterStore === "popularity" ? 0.6 : 1 }}
        >
          인기순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id="likes"
          style={{ opacity: filterStore === "likes" ? 0.6 : 1 }}
        >
          좋아요순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id="reviews"
          style={{ opacity: filterStore === "reviews" ? 0.6 : 1 }}
        >
          후기순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id="max_price"
          style={{ opacity: filterStore === "max_price" ? 0.6 : 1 }}
        >
          높은 가격순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id="min_price"
          style={{ opacity: filterStore === "min_price" ? 0.6 : 1 }}
        >
          낮은 가격순
        </Btn>
      </BtnContainer>
    </FilterContainer>
  );
};

const mapStateToProps = (state) => {
  return { info: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPageNum: (data) => dispatch(pageNum(data)),
    getFilterOption: (data) => dispatch(filterOption(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
