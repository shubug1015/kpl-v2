import React, { useState } from 'react';
import styled from 'styled-components';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { pageNum } from 'store';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const items_in_page = 12;

const PageBar = ({ itemNum, url, redux_savePageNum }) => {
  const maxPage =
    itemNum !== -1
      ? itemNum % items_in_page > 0
        ? Math.floor(itemNum / items_in_page) + 1
        : Math.floor(itemNum / items_in_page)
      : -1;

  const loc = useLocation();

  var pageNow = parseInt(loc.search.split('page=')[1]);

  var currentPage = store.getState()?.page;

  const history = useHistory();

  const [page, setPage] = useState(
    currentPage % 10 === 0
      ? currentPage - 10
      : Math.floor(currentPage / 10) * 10
  );

  const nextPage = () => {
    maxPage - page > 10 ? setPage(page + 10) : setPage(page);
  };

  const prePage = () => {
    if (page !== 0) {
      setPage(page - 10);
    }
    return;
  };

  const getPage = (event) => {
    const urlSearchNow = history.location.search;
    redux_savePageNum(event.target.value);
    const pathurl = history.location.pathname;
    const search = store.getState()?.search;
    const page = store.getState()?.page;
    const filter = store.getState()?.filter;
    currentPage = page;

    if (urlSearchNow.includes('search')) {
      history.push(`${pathurl}?search=${search}&filter=${filter}&page=${page}`);
    } else {
      history.push(`${pathurl}?filter=${filter}&page=${page}`);
    }
  };

  const firstPage = () => {
    redux_savePageNum(1);
    const pathurl = history.location.pathname;
    const page = store.getState()?.page;
    const filter = store.getState()?.filter;
    currentPage = page;
    history.push(`${pathurl}?filter=${filter}&page=${page}`);
  };

  const lastPage = () => {
    redux_savePageNum(maxPage);
    const pathurl = history.location.pathname;
    const page = store.getState()?.page;
    const filter = store.getState()?.filter;
    currentPage = page;
    history.push(`${pathurl}?filter=${filter}&page=${page}`);
  };

  return (
    <PaginationContainer>
      <Pagination aria-label='Page navigation example'>
        <PaginationItem>
          <PaginationLink
            first
            onClick={firstPage}
            style={{ color: 'black' }}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            previous
            onClick={prePage}
            style={{ color: 'black' }}
          />
        </PaginationItem>
        {Array.apply(
          null,
          maxPage - page > 10 ? Array(10) : Array(maxPage - page)
        ).map((x, i) => {
          return (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={getPage}
                value={i + 1 + page}
                style={{
                  borderBottom:
                    pageNow === i + 1 + page ? '2px solid black' : null,
                  width: '35px',
                  color: 'black',
                  opacity: pageNow === i + 1 + page ? 1 : 0.5,
                  boxShadow: 'none',
                }}
              >
                {i + 1 + page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationLink next onClick={nextPage} style={{ color: 'black' }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last style={{ color: 'black' }} onClick={lastPage} />
        </PaginationItem>
      </Pagination>
    </PaginationContainer>
  );
};

const mapStateToProps = (state) => {
  return { info: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    redux_savePageNum: (data) => dispatch(pageNum(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageBar);
