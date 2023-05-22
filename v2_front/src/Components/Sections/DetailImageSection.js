import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  padding: 30px;
  width: 50vw;
  height: 1000px;
`;

const DetailImageSection = ({ imageUrl }) => {
  return (
    <Container>
      <Image bgUrl={`${imageUrl}`} />
    </Container>
  );
};

export default DetailImageSection;
