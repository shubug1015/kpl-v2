import React, { Component } from "react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";

class StarRating extends Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;
    const Container = styled.div`
      display: flex;
    `;
    const RatingBox = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      margin-left: 20px;
    `;
    return (
      <Container>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </Container>
    );
  }
}

export default StarRating;
