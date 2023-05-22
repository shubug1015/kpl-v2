import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FavSection from "./FavSection";
import Loader from "Components/Loader";

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
  width: 68vw;
`;

const Title = styled.div`
  border-bottom: ${(props) => props.theme.pinkBorder};
  width: 95%;
  padding: 20px 20px;
  margin: 30px 0px;
  font-size: 25px;
`;

const ItemNumContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  margin-left: 15px;
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
  width: 100%;
  padding: 0 30px;
  margin-top: -50px;
  margin-bottom: 10px;
`;

const FavSections = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 100%;
`;

const FavSectionItem = styled.div``;

const FavoritePresenter = ({ like, loading, error }) => {
  const likes = like.map((i) => i.product);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <Content>
        <Title>좋아요</Title>
        <ItemNumContainer>
          <ItemNum>총 {likes.length}개</ItemNum>
        </ItemNumContainer>
        <ItemContainer>
          <FavSections>
            {likes && likes.length > 0 && (
              <>
                {likes.map((item) => (
                  <>
                    <FavSectionItem>
                      <FavSection
                        key={item.id}
                        id={item.id}
                        imageUrl={item.product_image}
                        name={item.name}
                        brand={item.brand}
                        price={item.price}
                      />
                    </FavSectionItem>
                  </>
                ))}
              </>
            )}
          </FavSections>
        </ItemContainer>
      </Content>
    </Container>
  );
};

FavoritePresenter.propTypes = {
  like: PropTypes.array,
  // id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default FavoritePresenter;
