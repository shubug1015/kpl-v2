import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchTerm } from "store";
import { IoIosSearch } from "react-icons/io";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const Search = styled.form`
  display: flex;
  /* justify-content: left; */
  align-items: center;
  text-align: left;
  width: 20vw;
  font-size: 3vw;
`;

const SearchBox = styled.input`
  /* font-size: 110px; */

  height: 30px;
  border: ${(props) => props.theme.pinkBorder};
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
  transition: width 0.3s;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;

  /* bottom: 14.5px; */
  cursor: pointer;
  background-color: red;
`;

const SearchBar = ({ itemNum, searchTerm, getSearchTerm }) => {
  const [term, setTerm] = useState("");
  const [search, setSearch] = useState(false);
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (term !== "") {
      try {
        getSearchTerm(term);
        history.push(`/products/search/?search=${term}&page=1&filter=new`);
      } catch {
        console.log("error");
      } finally {
        setTerm("");
        getSearchTerm("");
      }
    } else if (term === "") {
      alert("검색어를 입력해주세요.");
    }
  };

  const focusInSearch = () => {
    setSearch(true);
  };

  const focusOutSearch = () => {
    setSearch(false);
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setTerm(value);
  };

  return (
    <Container>
      <Search onSubmit={handleSubmit}>
        <SearchBox
          placeholder={"상품명 검색"}
          value={term}
          onChange={updateTerm}
          onClick={focusInSearch}
          onBlur={focusOutSearch}
          style={{ width: search ? "100%" : "90%" }}
        />
        <SearchIcon
          style={{
            visibility: search ? "visible" : "hidden",
            transition: search
              ? "visibility 0.3s linear 0.3s "
              : "visibility 0s linear 0s",
          }}
        >
          <IoIosSearch onClick={handleSubmit} />
        </SearchIcon>
      </Search>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchTerm: (data) => dispatch(searchTerm(data)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
