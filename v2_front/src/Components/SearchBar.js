import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchTerm } from 'store';
import { IoIosSearch } from 'react-icons/io';

const Container = styled.div`
  @media only screen and (max-width: 768px) {
    width: 80%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  padding: 20px;
`;

const Search = styled.form`
  display: flex;
  width: 100%;
  text-align: left;
  font-size: 20px;
`;

const SearchBox = styled.input`
  font-size: 11px;
  height: 50px;
  border: ${(props) => props.theme.pinkBorder};
  border-radius: 5px;
  padding-left: 20px;
  outline: none;
  transition: width 0.3s;
`;

const SearchIcon = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #ffbfc1;
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
          placeholder={'원하는 상품명을 검색해 보세요!'}
          value={term}
          onChange={updateTerm}
          style={{ width: search ? '90%' : '70%' }}
        />
        <SearchIcon
          onClick={handleSubmit}
          style={{
            visibility: search ? 'visible' : 'hidden',
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
