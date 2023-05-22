import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { managersApi } from 'api';
import { useHistory } from 'react-router-dom';
import { IoIosHeartEmpty } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';

const Container = styled.div`
  ${(props) => props.theme.containerTag}
`;

const Title = styled.div`
  ${(props) => props.theme.titleTag}
`;

const Content = styled.div`
  border: 1px solid black;
  width: 70vw;
  margin-bottom: 50px;
`;

const TopContent = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  display: flex;
  width: 100%;
`;

const MainImage = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  /* background-color: rgba(219, 219, 219, 0.7); */
  width: 55%;
`;

const ImageText = styled.div`
  width: 100%;
  height: 80%;
  /* background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center; */
`;

const MainInfo = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: ${(props) => props.theme.mainBorder};
  border-bottom: ${(props) => props.theme.mainBorder};
  padding: 0 10px;
  width: 45%;
`;

const Company = styled.div`
  border-bottom: ${(props) => props.theme.boldPinkBorder};
  font-size: 12px;
  padding: 15px 0px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  font-size: 12px;
  padding: 15px 0px;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  font-size: 12px;
  padding: 15px 0px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => props.theme.mainBorder};
  height: 180px;
  font-size: 13px;
  overflow: auto;
`;

const OptionTitle = styled.div`
  width: 60px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 30px;
  width: 100%;
  height: 100%;
`;

const AddOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const AddBtn = styled.div`
  margin-top: -10px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  :not(:last-child) {
    border-bottom: ${(props) => props.theme.mainBorder};
  }
  height: 50px;
  font-size: 13px;
`;

const ItemTitle = styled.div`
  width: 60px;
`;

const OptionBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 20px;
  height: 20px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  opacity: 0.3;
  margin: 15px 0px;
`;

const PurchaseBtn = styled.div`
  text-align: center;
  line-height: 50px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 150px;
  height: 50px;
  margin-right: 10px;
`;

const CartBtn = styled.div`
  text-align: center;
  line-height: 50px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.pinkColor};
  width: 150px;
  height: 50px;
  margin-right: 10px;
`;

const LikeBtn = styled.div`
  text-align: center;
  line-height: 50px;
  border: ${(props) => props.theme.mainBorder};
  border-radius: 4px;
  width: 60px;
  height: 50px;
`;

const BottomContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0px;
`;

const DetailImageEx = styled.div`
  @media screen and (max-width: 768px) {
    height: 300px;
  }
  border: ${(props) => props.theme.mainBorder};
  width: 60%;
  height: 50vh;
  margin-bottom: 30px;
`;

const DetailImage = styled.div`
  margin-bottom: 80px;
`;
const ImageInputContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageInput = styled.input`
  border-bottom: 1px solid black;
  width: 180px;
  font-size: 12px;
  outline: none;
`;

const TextInput = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  width: 50%;
  height: 30px;
  padding-left: 5px;
  margin: 0 10px;
  font-size: 0.8vw;
  outline: none;
`;

const SubmitBtn = styled.button`
  background-color: ${(props) => props.theme.pinkColor};
  border: 4px;
  width: 100px;
  height: 40px;
  margin-bottom: 80px;
  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`;

const Register = () => {
  const [mainImage, setMainImage] = useState(null);
  const [detailImage, setDetailImage] = useState([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [option, setOption] = useState(['']);
  const [optionTab, setOptionTab] = useState([]);
  const [optionNum, setOptionNum] = useState(0);
  const [stock, setStock] = useState(['']);
  var tmp = [...option];
  var stk = [...stock];

  // const [file, setFile] = useState('');
  const [mainPreview, setMainPreview] = useState('');
  const [detailPreview, setDetailPreview] = useState([]);
  const detailImageCount = [0, 1, 2];

  const history = useHistory();

  const makeImgtag = (src) => {
    return (
      <img
        className='detail_preview'
        src={src}
        alt={src}
        style={{ width: '100%', height: '100%' }}
      />
    );
  };

  const handleMainImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      // setFile(file);
      setMainPreview(makeImgtag(reader.result));
    };
    reader.readAsDataURL(file);
    setMainImage(file);
  };

  const handleDetailImage = (event, index) => {
    event.preventDefault();
    let reader = new FileReader();
    let imageFile = event.target.files[0];
    var tmpDetailImage = Object.assign([], detailImage);
    var tmpPreview = Object.assign([], detailPreview);

    reader.onloadend = () => {
      tmpDetailImage[index] = imageFile;
      console.log(tmpDetailImage);
      setDetailImage(tmpDetailImage);
      tmpPreview[index] = makeImgtag(reader.result);
      console.log(tmpPreview);
      setDetailPreview(tmpPreview);
    };

    if (index === 0 || tmpPreview[index - 1] !== undefined) {
      reader.readAsDataURL(imageFile);
    } else {
      event.target.value = null;
      alert('사진을 순서대로 등록해 주세요.');
    }
  };

  const handleBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleOption = (index, event) => {
    if (index === 0 || tmp[index - 1] !== undefined) {
      tmp[index] = event.target.value;
      setOption(tmp);
    } else {
      event.target.value = null;
      alert('옵션을 순서대로 등록해 주세요.');
    }
  };

  const handleStock = (index, event) => {
    stk[index] = event.target.value;
    setStock(stk);
  };

  const addOption = () => {
    setOptionNum(optionNum + 1);
  };

  const deleteOption = (index) => {
    if (optionNum > 0) {
      setOptionNum(optionNum - 1);
      tmp.splice(index, 1);
      stk.splice(index, 1);
      setOption(tmp);
      setStock(stk);
    }
  };

  useEffect(() => {
    var arr = [];
    for (var i = 0; i <= optionNum; i++) {
      arr[i] = i;
    }
    setOptionTab(arr);
  }, [optionNum]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      mainImage !== null &&
      mainImage !== undefined &&
      brand !== '' &&
      name !== '' &&
      price !== ''
    ) {
      const data = new FormData();
      data.append('main_image', mainImage);
      for (var img of detailImage) {
        data.append('detail_image', img);
      }
      data.append('brand', brand);
      data.append('name', name);
      data.append('price', price);
      data.append('option', option);
      data.append('stock', stock);
      await managersApi.registerProduct(data);
      alert('제출되었습니다.');
      history.push('/myproduct/?page=1&filter=new');
    } else {
      alert('빈칸이 존재합니다.');
    }
  };

  return (
    <Container>
      <Title>상품 등록하기</Title>
      <Content>
        <TopContent>
          <MainImage>
            <ImageText>{mainPreview}</ImageText>
            <ImageInputContainer>
              <ImageInput type='file' name='image' onChange={handleMainImage} />
            </ImageInputContainer>
          </MainImage>
          <MainInfo>
            <Company>
              <TextInput
                type='text'
                name='brand'
                onChange={handleBrand}
                placeholder='작가/브랜드명을 입력해주세요.'
              />
              {'< 작가/브랜드명'}
            </Company>
            <Name>
              <TextInput
                type='text'
                name='name'
                onChange={handleName}
                placeholder='상품명을 입력해주세요.'
              />
              {'< 상품명'}
            </Name>
            <Price>
              <TextInput
                type='text'
                name='price'
                onChange={handlePrice}
                placeholder='가격을 입력해주세요.'
              />
              {'< 가격'}
            </Price>
            <OptionContainer>
              <OptionTitle>옵션</OptionTitle>
              <Options>
                {optionTab.map((optionNum) => (
                  <AddOption key={optionNum} id={optionNum}>
                    <TextInput
                      id={`option${optionNum}`}
                      type='text'
                      value={option[optionNum]}
                      onChange={(e) => handleOption(optionNum, e)}
                      placeholder='옵션을 입력해주세요.'
                    />
                    <TextInput
                      id={`stock${optionNum}`}
                      type='number'
                      value={stock[optionNum]}
                      onChange={(e) => handleStock(optionNum, e)}
                      placeholder='수량'
                    />
                    <OptionBtn onClick={() => deleteOption(optionNum)}>
                      <AiOutlineMinus />
                    </OptionBtn>
                  </AddOption>
                ))}
                <AddBtn>
                  <OptionBtn onClick={addOption}>+</OptionBtn>
                </AddBtn>
              </Options>
            </OptionContainer>
            <Item>
              <ItemTitle>수량</ItemTitle>
            </Item>
            <Item>
              <ItemTitle>배송비</ItemTitle>
            </Item>
            <Btns>
              <PurchaseBtn>구매하기</PurchaseBtn>
              <CartBtn>장바구니</CartBtn>
              <LikeBtn>
                <IoIosHeartEmpty size='25' />
              </LikeBtn>
            </Btns>
          </MainInfo>
        </TopContent>
        <BottomContent>
          {detailImageCount.map((i, index) => {
            return (
              <Fragment key={index}>
                <DetailImageEx>{detailPreview[i]}</DetailImageEx>
                <DetailImage>
                  <ImageInput
                    type='file'
                    name='image'
                    onChange={(e) => handleDetailImage(e, i)}
                  />
                </DetailImage>
              </Fragment>
            );
          })}
        </BottomContent>
      </Content>
      <SubmitBtn onClick={handleSubmit}>제출</SubmitBtn>
    </Container>
  );
};

export default Register;
