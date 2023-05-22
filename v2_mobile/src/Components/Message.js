import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  color: ${(props) => props.color};
  padding: 15px;
  font-weight: 900;
`;

const Message = ({ text1, text2, color }) => (
  <Container>
    <Text color={color}>{text1}</Text>
    <Text color={color}>{text2}</Text>
  </Container>
);

Message.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Message;
