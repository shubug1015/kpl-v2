import React, { useState } from 'react';
import styled from 'styled-components';
import { managersApi } from 'api';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const MonthBtn = styled.div`
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  width: 80vw;
  height: 500px;
`;

const Graph = styled.div`
  text-align: center;
  background-color: pink;
  width: 50px;
  :first-child {
    margin-left: 15%;
  }
  :not(:last-child) {
    margin-right: 30%;
  }
`;

const Month = styled.div`
  display: flex;
  width: 80vw;
  height: 30px;
`;

const MonthText = styled.div`
  text-align: center;
  line-height: 30px;
  width: 50px;
  :first-child {
    margin-left: 15%;
  }
  :not(:last-child) {
    margin-right: 30%;
  }
`;

const SoldPresenter = ({ items }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const submitMonth = async (e) => {
    const { data: dd } = await managersApi.detailReport(parseInt(e.target.id));
    console.log(dd);
  };

  const data = Object.keys(items);

  return (
    <Container>
      <Title>판매현황</Title>
      <div onClick={handleOpen}>월별</div>
      {open ? (
        <>
          <MonthBtn id={data[0]} onClick={submitMonth}>
            {data[0]}월
          </MonthBtn>
          <MonthBtn id={data[1]} onClick={submitMonth}>
            {data[1]}월
          </MonthBtn>
          <MonthBtn id={data[2]} onClick={submitMonth}>
            {data[2]}월
          </MonthBtn>
        </>
      ) : null}
      <Content>
        <Graph
          style={{
            height: `${items[data[0]] * 50}px`,
            lineHeight: `${items[data[0]] * 50}px`,
          }}
        >
          {items[data[0]]}개
        </Graph>
        <Graph
          style={{
            height: `${items[data[1]] * 50}px`,
            lineHeight: `${items[data[1]] * 50}px`,
          }}
        >
          {items[data[1]]}개
        </Graph>
        <Graph
          style={{
            height: `${items[data[2]] * 50}px`,
            lineHeight: `${items[data[2]] * 50}px`,
          }}
        >
          {items[data[2]]}개
        </Graph>
      </Content>
      <Month>
        <MonthText>{data[0]}월</MonthText>
        <MonthText>{data[1]}월</MonthText>
        <MonthText>{data[2]}월</MonthText>
      </Month>
    </Container>
  );
};

export default SoldPresenter;
