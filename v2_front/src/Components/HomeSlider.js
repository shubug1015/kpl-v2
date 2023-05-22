import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';

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

const ComponentBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 13%;
  padding-bottom: 10px;
`;

const HomeSlider = ({ error }) => {
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
    <Files>
      <IoIosArrowBack
        style={{
          color: 'white',
          cursor: 'pointer',
          zIndex: '2',
          width: '5vw',
          height: '600px',
          opacity: '0.3',
        }}
        onClick={previousFile}
      />
      {files &&
        files.map((file, index) => (
          <File
            key={file.id}
            bgUrl={file.url}
            showing={index === currentItem}
          ></File>
        ))}
      <ComponentBox>
        {files &&
          files.map((file, index) => (
            <FaCircle
              key={index}
              style={{
                display: 'inline-block',
                alignSelf: 'flex-end',
                color: '#474440',
                fontSize: '10px',
                opacity: currentItem === index ? '1' : '0.3',
                cursor: 'pointer',
                zIndex: '2',
              }}
              onClick={() => {
                setCurrentItem(index);
              }}
            />
          ))}
      </ComponentBox>
      <IoIosArrowForward
        style={{
          color: 'white',
          cursor: 'pointer',
          zIndex: '2',
          width: '5vw',
          height: '600px',
          opacity: '0.3',
        }}
        onClick={nextFile}
      />
    </Files>
  );
};

export default HomeSlider;
