import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { managersApi } from 'api';
import { IoIosHeartEmpty } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

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
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
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
  background-image: url(${(props) => props.bgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
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

const Modify = () => {
  const pre_data = useLocation().state;
  const pre_brand = pre_data.brand.brand;
  const pre_name = pre_data.name.name;
  const pre_price = pre_data.price.price;
  const pre_option = pre_data.option.option;
  const pre_mainImg = pre_data.imageUrl.imageUrl;
  const pre_detailImg = pre_data.detail_image.detail_image;
  console.log(pre_detailImg);
  const [mainImage, setMainImage] = useState('');
  const [detailImage, setDetailImage] = useState([]);
  const [id, setId] = useState(pre_data.id.id);
  const [brand, setBrand] = useState(pre_brand);
  const [name, setName] = useState(pre_name);
  const [price, setPrice] = useState(pre_price);
  const [option, setOption] = useState(
    pre_option.map((tmp) => {
      return tmp.name;
    })
  );
  const [optionTab, setOptionTab] = useState([]);
  const [optionNum, setOptionNum] = useState(pre_option.length - 1);
  const [stock, setStock] = useState(
    pre_option.map((tmp) => {
      return tmp.stock;
    })
  );
  var tmp = [...option];
  var stk = [...stock];

  const [file, setFile] = useState('');
  const [mainPreviewURL, setMainPreviewURL] = useState('');

  const [detailImg1, setDetailImg1] = useState('');
  const [detailPreviewURL1, setDetailPreviewURL1] = useState('');
  const [detailImg2, setDetailImg2] = useState('');
  const [detailPreviewURL2, setDetailPreviewURL2] = useState('');
  const [detailImg3, setDetailImg3] = useState('');
  const [detailPreviewURL3, setDetailPreviewURL3] = useState('');

  const handleMainImage = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setMainPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    setMainImage(file);
  };

  let profile_preview = null;
  if (file !== '') {
    profile_preview = (
      <img
        className='profile_preview'
        src={mainPreviewURL}
        style={{ width: '100%', height: '100%' }}
      ></img>
    );
  }

  const handleDetailImage1 = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let detailImg = event.target.files[0];
    var temp = detailImage;
    temp[0] = detailImg;
    reader.onloadend = () => {
      setDetailImg1(detailImg);
      setDetailPreviewURL1(reader.result);
    };
    reader.readAsDataURL(detailImg);
    setDetailImage(temp);
  };

  const handleDetailImage2 = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let detailImg = event.target.files[0];
    var temp = detailImage;
    temp[1] = detailImg;
    reader.onloadend = () => {
      setDetailImg2(detailImg);
      setDetailPreviewURL2(reader.result);
    };
    reader.readAsDataURL(detailImg);
    setDetailImage(temp);
  };

  const handleDetailImage3 = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let detailImg = event.target.files[0];
    var temp = detailImage;
    temp[2] = detailImg;
    reader.onloadend = () => {
      setDetailImg3(detailImg);
      setDetailPreviewURL3(reader.result);
    };
    reader.readAsDataURL(detailImg);
    setDetailImage(temp);
  };

  let detail1_preview = null;
  if (detailImg1 !== '') {
    detail1_preview = (
      <img
        className='detail_preview'
        src={detailPreviewURL1}
        alt={detailPreviewURL1}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
  let detail2_preview = null;
  if (detailImg2 !== '') {
    detail2_preview = (
      <img
        className='detail_preview'
        src={detailPreviewURL2}
        alt={detailPreviewURL2}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
  let detail3_preview = null;
  if (detailImg3 !== '') {
    detail3_preview = (
      <img
        className='detail_preview'
        src={detailPreviewURL3}
        alt={detailPreviewURL3}
        style={{ width: '100%', height: '100%' }}
      />
    );
  }

  const history = useHistory();
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
    tmp[index] = event.target.value;
    setOption(tmp);
  };

  const handleStock = (index, event) => {
    stk[index] = parseInt(event.target.value);
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
    // eslint-disable-next-line
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
      data.append('id', id);
      data.append('brand', brand);
      data.append('name', name);
      data.append('price', price);
      data.append('option', option);
      data.append('stock', stock);
      console.log(
        id,
        mainImage,
        detailImage,
        pre_mainImg,
        brand,
        name,
        price,
        option,
        stock
      );
      await managersApi.modifyProduct(data);
      alert('제출되었습니다.');
      history.push('/myproduct');
    } else {
      alert('빈칸이 존재합니다.');
    }
  };

  return (
    <Container>
      <Title>상품 정보 수정</Title>
      <Content>
        <TopContent>
          <MainImage>
            {mainImage == '' ? (
              <ImageText bgUrl={pre_mainImg} />
            ) : (
              <ImageText>{profile_preview}</ImageText>
            )}
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
                placeholder={pre_brand}
              />
              {'< 작가/브랜드명'}
            </Company>
            <Name>
              <TextInput
                type='text'
                name='name'
                onChange={handleName}
                placeholder={pre_name}
              />
              {'< 상품명'}
            </Name>
            <Price>
              <TextInput
                type='text'
                name='price'
                onChange={handlePrice}
                placeholder={pre_price}
              />
              {'< 가격'}
            </Price>
            <OptionContainer>
              <OptionTitle>옵션</OptionTitle>
              <Options>
                {optionTab.map((optionNum) => (
                  <AddOption key={optionNum} id={optionNum}>
                    <TextInput
                      id={optionNum}
                      type='text'
                      value={option[optionNum]}
                      onChange={(e) => handleOption(optionNum, e)}
                      placeholder='옵션을 입력하세요'
                    />
                    <TextInput
                      id={`stock${optionNum}`}
                      type='text'
                      value={stock[optionNum]}
                      onChange={(e) => handleStock(optionNum, e)}
                      placeholder='수량을 입력하세요'
                    />
                    <OptionBtn onClick={() => deleteOption(optionNum)}>
                      <AiOutlineMinus />
                    </OptionBtn>
                  </AddOption>
                ))}
                <AddBtn>
                  <OptionBtn onClick={addOption}>
                    <AiOutlinePlus />
                  </OptionBtn>
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
          {/* {mainImage == '' ? (
              <ImageText bgUrl={pre_mainImg} />
            ) : (
              <ImageText>{profile_preview}</ImageText>
            )} */}
          {detailImage[0] === undefined ? (
            <DetailImageEx bgUrl={pre_detailImg[0].file} />
          ) : (
            <DetailImageEx>{detail1_preview}</DetailImageEx>
          )}
          <DetailImage>
            <ImageInput
              type='file'
              name='image'
              onChange={handleDetailImage1}
            />
          </DetailImage>
          {detailImage[1] === undefined ? (
            <DetailImageEx bgUrl={pre_detailImg[1].file} />
          ) : (
            <DetailImageEx>{detail2_preview}</DetailImageEx>
          )}
          <DetailImage>
            <ImageInput
              type='file'
              name='image'
              onChange={handleDetailImage2}
            />
          </DetailImage>
          {detailImage[2] === undefined ? (
            <DetailImageEx bgUrl={pre_detailImg[2].file} />
          ) : (
            <DetailImageEx>{detail3_preview}</DetailImageEx>
          )}
          <DetailImage>
            <ImageInput
              type='file'
              name='image'
              onChange={handleDetailImage3}
            />
          </DetailImage>
        </BottomContent>
      </Content>
      <SubmitBtn onClick={handleSubmit}>제출</SubmitBtn>
    </Container>
  );
};

export default Modify;
