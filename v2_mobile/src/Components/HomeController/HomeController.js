import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "Components/HomeController/HomeController.css";
import { FaChevronUp } from "react-icons/fa";

const Container = styled.div`
  align-items: center;
  position: fixed;
  left: 0;
  top: 350px;
  z-index: 3;
  border: ${(props) => props.theme.mainBorder};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 130px;
  height: 150px;
  background-color: #ffffff;
`;

const Box = styled.div``;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 30px;
  width: 120px;
  font-size: 11px;
  cursor: pointer;
  :not(:first-child) {
    margin-top: 5px;
  }
  &:hover {
    opacity: 0.5;
  }
`;

const HomeController = () => {
  const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const onScroll = () => {
      setState({ y: window.scrollY, x: window.scrollX });
    };
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    });
    return state;
  };

  const { y } = useScroll();

  const GoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const GoToBI = () => {
    window.scrollTo({
      top: 630,
      behavior: "smooth",
    });
  };
  const GoToRI = () => {
    window.scrollTo({
      top: 1100,
      behavior: "smooth",
    });
  };
  const GoToNA = () => {
    window.scrollTo({
      top: 1650,
      behavior: "smooth",
    });
  };

  return (
    <Container className={y >= 620 ? "not_hide" : "hide"}>
      <Box>
        <Btn onClick={GoToTop}>
          <FaChevronUp />
        </Btn>
        <Btn
          onClick={GoToBI}
          style={{
            backgroundColor: y >= 620 && y < 1050 ? "#ffe7e7" : "transparent",
          }}
        >
          Best Items
        </Btn>
        <Btn
          onClick={GoToRI}
          style={{
            backgroundColor: y >= 1050 && y < 1550 ? "#ffe7e7" : "transparent",
          }}
        >
          Recommended Items
        </Btn>
        <Btn
          onClick={GoToNA}
          style={{
            backgroundColor: y >= 1550 ? "#ffe7e7" : "transparent",
          }}
        >
          New Arrival
        </Btn>
      </Box>
    </Container>
  );
};

export default HomeController;
