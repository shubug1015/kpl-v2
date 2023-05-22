import React, { useState, useEffect, useRef } from "react";
import Slide from "./Slide";
import styled from "styled-components";
import img1 from "Components/assets/dorus_1.jpg";
import img2 from "Components/assets/dorus_2.jpg";
import img3 from "Components/assets/dorus_3.jpg";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

const Container = styled.div`
  width: 60%;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  border: none;
  font-size: 30px;
`;

const TOTAL_SLIDES = 2;

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  //   setInterval(() => {
  //     if (currentSlide >= TOTAL_SLIDES) {
  //       setCurrentSlide(0);
  //     } else {
  //       setCurrentSlide(currentSlide + 1);
  //     }
  //   }, 10000);

  setInterval(() => {
    console.log("0");
  }, 5000);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <Container>
      {currentSlide}
      <SliderContainer ref={slideRef}>
        <Slide img={img1} />
        <Slide img={img2} />
        <Slide img={img3} />
      </SliderContainer>
      <Button onClick={prevSlide}>
        <IoIosArrowDropleft />
      </Button>
      <Button onClick={nextSlide}>
        <IoIosArrowDropright />
      </Button>
    </Container>
  );
};

export default Slider;
