import React from 'react';
import styled from 'styled-components';
import store, { pageNum, filterOption } from 'store';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  height: 100px;
`;

const QtyConainer = styled.div`
  @media only screen and (max-width: 600px) {
    width: 80px;
    font-size: 13px;
    font-weight: 700;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  font-weight: 700;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
`;

const Btn = styled.div`
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
  font-size: 11px;
  padding: 0px 5px;
  cursor: pointer;
`;

const Divider = styled.span`
  font-size: 10px;
  opacity: 0.5;
`;

const Filter = ({ itemNum, redux_savePageNum, redux_saveFilterOption }) => {
  const history = useHistory();

  const urlSearchNow = history.location.search;

  const getFilter = (event) => {
    redux_savePageNum(1);
    redux_saveFilterOption(event.target.id);
    const pathurl = history.location.pathname;
    const search = store.getState()?.search;
    const page = store.getState()?.page;
    const filter = store.getState()?.filter;
    if (urlSearchNow.includes('search')) {
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
          id='new'
          style={{ opacity: filterStore === 'new' ? 0.6 : 1 }}
        >
          신상품순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id='sold'
          style={{ opacity: filterStore === 'sold' ? 0.6 : 1 }}
        >
          판매순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id='views'
          style={{ opacity: filterStore === 'views' ? 0.6 : 1 }}
        >
          조회순
        </Btn>
        <Divider>|</Divider>
        <Btn
          onClick={getFilter}
          id='likes'
          style={{ opacity: filterStore === 'like' ? 0.6 : 1 }}
        >
          좋아요순
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
    redux_savePageNum: (data) => dispatch(pageNum(data)),
    redux_saveFilterOption: (data) => dispatch(filterOption(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
