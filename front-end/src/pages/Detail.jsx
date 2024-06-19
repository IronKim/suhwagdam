// import { Footer, Header } from 'antd/es/layout/layout';
import React, {useState}from 'react';
import styled from "styled-components";
import Butt from '../components/Butt'
import { Modal } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: '진행 금액',pv: 3400, amt: 2400,
  },
  {
    name: '진행시간',pv: 1000, amt: 2210,
  },
  {
    name: '아무이름',pv: 1000, amt: 2210,
  },
  // 데이터넣자
];

const BaseDiv = styled.div`
/* border: 1px solid red; */
  width: 1200px;
  margin: auto;
  margin-top: 5%;

  @media (max-width: 1199px) {
    width: 98%;
    padding: 0 10px;
  }
`;

const HDiv = styled.div`
  border: 1px solid #E8E8E8;
  width: 100%;
  height: 700px;
  float: left;
  border-radius:15px;
  overflow: hidden;
  display: flex;
  @media (max-width: 700px) {
      display: block;
  }
`;

const ImgDiv = styled.div`
 /* border: 1px solid red; */
  width: 40%;
  height:100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width: 700px) {
      width: 100%;
      height:30%;
  }
`;

const ContextDiv = styled.div`
  /* border: 1px solid blue; */
  background: #FFFEF8;
  width: 60%;
  height:100%;
  @media (max-width: 700px) {
      width: 100%;
      height:70%;
  }
`;

const TitleDiv = styled.div`
  border: 1px solid #FFFEF8;
  background: #FFFEF8;
  width: 85%;
  height:10%;
  margin: auto;
  box-sizing: border-box;
  @media (max-width: 700px){
    display : flex;
    align-items : center;
  }
`;

const ConDiv = styled.div`
  /* border: 1px solid red; */
  background: #FFFEF8;
  width: 80%;
  height:30%;
  font-size: 18px;
  color: #616060;
  margin: auto;
`;

const TimeDiv = styled.div`
  /* border: 1px solid red; */
  background: #FFFEF8;
  width: 100%;
  height:10%;
  font-size: 25px;
  display: flex;
  @media (max-width: 899px) {
    font-size: 20px;
  }
`;
const TimeT = styled.div`
  /* border: 1px solid red; */
  background: #FFFEF8;
  width: 40%;
  height:100%;
  /* font-size: 25px; */
  display : flex;
  justify-content : right;
  align-items : center;
  @media (max-width: 420px){
    width: 35%;
  }
`;
const TimeT2 = styled.div`
  /* border: 1px solid red; */
  background:${(props) => props.width || "230px"};
  width:${(props) => props.width || "59%"};
  height:${(props) => props.width || "100%"};
  /* font-size: 25px; */
  display : flex;
  align-items : center;
  margin-left: 1%;
  font-weight: bold;
  color: orange;
`;

const BtnDiv = styled.div`
  /* border: 1px solid red; */
  background: #FFFEF8;
  width: 100%;
  height:10%;
  display: flex;
  align-items : center;
  justify-content : center;
  
`;
const BtnInner = styled.div`
  /* border: 1px solid blue; */
  background: #FFFEF8;
  width: 45%;
  text-align: center;
  @media (max-width: 420px){
    width: 50%;
  }
  
`;
const Pricespan = styled.span`
  color: orange;
`

const GraphDiv = styled.div`
  /* border: 1px solid blue; */
  background: #FFFEF8;
  width: 100%;
  height:35%;
  text-align: center;
  align-items : center;
  justify-content : center;
  display: flex;
  @media (max-width: 899px) {
    font-size: 20px;
  }
`;
const Graph = styled.div`
  /* border: 1px solid red;      */
  height: 100%;
  width: 95%;
  background-color: white;
`
const ActionText = styled.div`
  height:5%;
  width: 100%;
  text-align: center;
  color: #5AC463;
  font-weight: bold;
`

const FootDiv = styled.div`
border: 1px solid orange;
  width: 100%;
  height: 200px;
  display: flex;
`;

const StyledModal = styled(Modal)`
  .ant-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-content {
    /* border: 1px solid red; */
    width: 100%; 
    height: 300px;
    max-width: 500px;
    padding: 50px;
  }
  .ant-modal-body {
    /* border: 1px solid blue; */
    height: 70%;
    margin-bottom: 0;
    font-size: 20px;
  }

`;
const Mheaed = styled.div`
  /* border: 1px solid orange; */
  height: 50%;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const MInput = styled.div`
  /* border: 1px solid orange; */
  height: 35%;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const MInputInner = styled.input`
  border: 1px solid #E8E8E8;
  border-radius: 5px;
  font-size: 20px;
  height: 70%;
  width: 40%;
  text-align: right;
  padding: 0 10px;
`;
const MNow = styled.div`
  /* border: 1px solid orange; */
  height: 18%;
  display : flex;
  justify-content : center;
  align-items : center;
  color: #616060;
  @media (max-width: 639px){
    font-size: 18px;
    margin:auto;
        } 
  @media (max-width: 400px){
    font-size: 13px;
        } 
`;
const MBtn = styled.div`
  /* border: 1px solid pink; */
  height: 35%;
  width: 100%;
  display: flex;
  align-items : center;
  justify-content : center;
`;
const MBtnInner = styled.div`
  /* border: 1px solid pink; */
  width: 50%;
`;
/////////////////////////////////////////////////////////////////////////////////////
const Detail = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const [curBidPrice, setCurbidPrice] = useState('');

    const curBidPriceHand = (e) => {
      let curBidPrice = e.target.value;
      curBidPrice = Number(curBidPrice.replaceAll(',',''));
      if(isNaN(curBidPrice)){
        setCurbidPrice(0);
      }else{
        setCurbidPrice(curBidPrice.toLocaleString('ko-KR'));
      }
    }
    const curBidPriceFocus = () => {
      setCurbidPrice('');
    }


    return (
        <div style={{width:'100%'}}>
            <BaseDiv>
                <HDiv>
                    <ImgDiv>
                        <img src='https://shop-phinf.pstatic.net/20230616_83/1686882884732XWOxI_JPEG/10805132545701427_432852016.jpg?type=m510'></img>
                    </ImgDiv>
                    <ContextDiv>
                        <TitleDiv>
                            <h2>무화과 1KG</h2>
                        </TitleDiv>
                        <ConDiv> 가족들끼리 다 못나눠 먹을것 같아서 올립니다.
                        당도 높고 맛있는데 껍질이 예쁘지 않아요.</ConDiv>
                        <TimeDiv><TimeT>마감까지</TimeT><TimeT2>0일 00시간 00분 00초</TimeT2></TimeDiv>
                        <BtnDiv>
                          <BtnInner><Butt background='#FFFEF8'color='#616060' width="98%" height="100%"
                                      fontSize="20px" media="true">
                            현재 가격&nbsp;:&nbsp;<Pricespan>100</Pricespan>원</Butt></BtnInner>
                          <BtnInner><Butt cursor="pointer" width="98%" height="100%" onClick={() => setIsModalOpen(true)}>입찰</Butt></BtnInner>
                        </BtnDiv>
                        <GraphDiv>
                          <Graph>
                            <LineChart width={730} height={250} data={data}
                              margin={{ top: 15, right: 80, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              {/* <Legend /> */}
                              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                            </LineChart>
                          </Graph>
                        </GraphDiv>
                        <ActionText>경매현황</ActionText>
                    </ContextDiv>
                </HDiv>

                <div style={{border: '', width:'100%', height:'30px', display: 'flex'}}>
                    ---------------------
                </div>
                
                <FootDiv>
                    dd
                </FootDiv>
            <StyledModal open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <MBtn key="footer">
                <MBtnInner>
                <Butt key="back" onClick={handleCancel} width='98%' background='#FFFFFF' color='404040'>
                  취소
                </Butt>
                </MBtnInner>
                <MBtnInner>
                <Butt key="submit" onClick={handleOk} width='98%'>
                  입찰
                </Butt>
                </MBtnInner>
                </MBtn>
              ]}centered
              maskClosable={false} >
              <Mheaed>남은 시간<TimeT2 background='none' width='auto' height='auto'>00시간00분</TimeT2></Mheaed>
              <MNow>현재 가격&nbsp;&nbsp; <Pricespan>200000000000000000</Pricespan>원</MNow>
              <MInput>금액&nbsp;:&nbsp;<MInputInner type='text' 
                                        value={curBidPrice} onChange={curBidPriceHand} 
                                        onFocus={curBidPriceFocus} name="curBidPrice"></MInputInner>원</MInput>
            </StyledModal>
            </BaseDiv>

        </div>
    );
};

export default Detail;