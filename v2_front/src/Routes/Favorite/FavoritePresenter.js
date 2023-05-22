import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FavSection from 'Components/Sections/FavSection';
import PageBar from 'Components/PageBar';
import Message from 'Components/Message';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Title = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 100%;
  padding: 20px 20px;
  margin: 30px 0px;
  font-size: 25px;
`;

const ItemNumContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const ItemNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 15px;
  font-size: 12px;
  font-weight: 900;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 90vw;
  margin: 40px 5vw;
`;

const Text = styled.div`
  text-align: center;
  line-height: 150px;
  width: 100%;
  height: 200px;
`;

const FavoritePresenter = ({ like, itemNum, error }) => {
  const likes = like.map((i) => i.product);

  return (
    <Container>
      <Content>
        <Title>좋아요</Title>
        <ItemNumContainer>
          <ItemNum>총 {itemNum}개</ItemNum>
        </ItemNumContainer>
        <ItemContainer>
          {likes && likes.length > 0 ? (
            <>
              {likes.map((item) => (
                <FavSection
                  key={item.id}
                  id={item.id}
                  imageUrl={item.product_image}
                  name={item.name}
                  brand={item.brand}
                  price={item.price}
                />
              ))}
            </>
          ) : (
            <Text>담긴상품이 없습니다.</Text>
          )}
        </ItemContainer>
        {likes && likes.length > 0 ? <PageBar itemNum={itemNum} /> : null}
      </Content>
      {error && <Message color='e74c3c' text={error} />}
    </Container>
  );
};

FavoritePresenter.propTypes = {
  like: PropTypes.array,
  error: PropTypes.string,
};

export default FavoritePresenter;
