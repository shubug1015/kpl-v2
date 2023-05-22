import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchTerm } from 'store';
import { IoIosSearch } from 'react-icons/io';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const Search = styled.form`
  display: flex;
  text-align: left;
  font-size: 20px;
`;

const SearchBox = styled.input`
  font-size: 11px;
  height: 30px;
  border: 1px solid black;
  border-radius: 4px;
  padding-left: 10px;
  outline: none;
  transition: width 0.3s;
`;

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  cursor: pointer;
  padding: 5px;
`;

const SearchBar = ({ redux_saveSearchTerm }) => {
  const [term, setTerm] = useState('');
  const [search, setSearch] = useState(false);
  const focusInSearch = () => {
    setSearch(true);
  };

  const focusOutSearch = () => {
    setSearch(false);
  };

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (term !== '') {
      try {
        redux_saveSearchTerm(term);
        history.push(`/products/search/?search=${term}&page=1&filter=new`);
      } catch {
        alert('Error');
      } finally {
        setTerm('');
      }
    } else if (term === '') {
      alert('검색어를 입력해주세요.');
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setTerm(value);
  };

  return (
    <Container>
      <Search
        onSubmit={handleSubmit}
        onClick={focusInSearch}
        onBlur={focusOutSearch}
      >
        <SearchBox
          placeholder={'내 상품 검색하기'}
          value={term}
          onChange={updateTerm}
          style={{ width: search ? '200px' : '180px' }}
        />
        <SearchIcon
          onClick={handleSubmit}
          style={{
            display: search ? '' : 'none',
            transition: search
              ? 'visibility 0.3s linear 0.3s '
              : 'visibility 0s linear 0s',
          }}
        >
          <IoIosSearch />
        </SearchIcon>
      </Search>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    redux_saveSearchTerm: (data) => dispatch(searchTerm(data)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
