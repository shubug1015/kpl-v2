import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';
import HomeSlider from 'Components/HomeSlider';

const Container = styled.div``;

const ComponentBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 13%;
  padding-bottom: 10px;
`;

const Files = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100vw;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const BestContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Sectionitle = styled.div`
  height: 30px;
  font-size: 20px;
  margin: 20px 0px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  border: ${(props) => props.theme.mainBorder};
  padding: 40px;
  width: 90vw;
  margin: 0px 5vw;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 0px 5vw;
  margin-bottom: 100px;
  width: 90vw;
  font-size: 13px;
  opacity: 0.8;
`;

const HomePresenter = ({ error }) => {
  const files = [
    {
      id: 0,
      url: require('Components/assets/dorus_1.jpg'),
    },
    {
      id: 1,
      url: require('Components/assets/dorus_2.jpg'),
    },
    {
      id: 2,
      url: require('Components/assets/dorus_3.jpg'),
    },
  ];

  const [currentItem, setCurrentItem] = useState(0);

  const nextFile = () => {
    if (currentItem !== 2) {
      setCurrentItem(currentItem + 1);
    } else {
      setCurrentItem(0);
    }
  };
  const previousFile = () => {
    if (currentItem !== 0) {
      setCurrentItem(currentItem - 1);
    } else {
      setCurrentItem(2);
    }
  };

  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      var timer = setTimeout(() => setCurrentItem(0), 5000);
    } else {
      timer = setTimeout(() => setCurrentItem(currentItem + 1), 5000);
    }
    return timer;
  };

  useEffect(() => {
    let timer = slide();
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return (
    <>
      <Helmet>
        <title>Dorus | 세상을 아름답게</title>
      </Helmet>
      <Container>
        <HomeSlider />
        <BestContainer>
          <Sectionitle>Best Items</Sectionitle>
          <SectionContainer>11111111111</SectionContainer>
          <LinkContainer>인기작품 보기 </LinkContainer>
          <Sectionitle>Recommended Items</Sectionitle>
          <SectionContainer>22222222222</SectionContainer>
          <LinkContainer>추천작품 보기 </LinkContainer>
          <Sectionitle>New Arrival</Sectionitle>
          <SectionContainer>3333333333</SectionContainer>
          <LinkContainer>최신작품 보기 </LinkContainer>
        </BestContainer>
      </Container>
    </>
  );
};

export default HomePresenter;
