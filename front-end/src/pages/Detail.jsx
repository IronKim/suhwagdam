import React, {useState, useEffect}from 'react';
import styled from "styled-components";
import Butt from '../components/Butt'
import RelatedGoods from '../components/RelatedGoods'
import Carousel from '../components/Carousel'
import { Modal } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecoilValue} from 'recoil';
import { goodsState } from '../atoms/goodsState';
import { userState } from '../atoms/userState';
import { postbid } from '../../src/api/BidApiService';
import { getBidsBygoodsSeq } from '../../src/api/BidApiService';
import sweet from 'sweetalert2'; 
import { subscribeToBidUpdates } from '../webSocket/Subscribe';
import {useParams} from "react-router-dom";
import { calculateTimeDifference } from '../hook/time';
import { numberFormat } from '../utils/formating';
import { getUserData } from '../../src/api/AuthApiService';

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
 /* border: 1px solid darkblue; */
  width: 40%;
  height:100%;
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
  
`;

const ConDiv = styled.div`
  /* border: 1px solid red; */
  background: #FFFEF8;
  width: 80%;
  height:30%;
  font-size: 25px;
  color: #616060;
  margin: auto;
  @media (max-width: 700px){
    font-size: 18px;
    padding-top: 10px;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
  @media (max-width: 700px){
   
  }
`;
const BtnInner = styled.div`
  /* border: 1px solid blue; */
  height: 80%;
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
    height: 230px;
    margin-top:10px;
    font-size: 10px;
  }
`;
const Graph = styled.div`
  /* border: 1px solid red; */
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
  @media (max-width: 899px) {
    margin-top:10px;
  }
`

const FootDiv = styled.div`
/* border: 1px solid orange; */
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* overflow: hidden; */
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

const Detail = () => {

  const dataList = useRecoilValue(goodsState); //상품아톰이
  const user = useRecoilValue(userState); //유저아톰이
  const params = useParams();
  const seq = params.goodsSeq;
  const detailGoods = dataList.find(goods => goods.seq === Number(seq));
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isTimeUp, setIsTimeUp] = useState(false);
  

    //포인트 들어오나 확인중
    const [userId, setUserId] = useState(user.accountId);
    const [userPoint, setUsePoint] = useState(user.accountId);
    useEffect(() => {
        getUserData(userId)
        .then(res => {
          setUsePoint(res.data.result.point)
          // console.log("겟유저포인트",res.data.result.point)
                })
        .catch(e => {
            console.log(e);
        })
    }, [detailGoods]);
    //포인트 들어오나 확인중
    
//시간
  useEffect(() => {
    if (detailGoods) {
      const deadlineDate = new Date(detailGoods?.deadline);

      const interval = setInterval(() => {
        const timeDifference = calculateTimeDifference(deadlineDate);
        setTime(timeDifference);

        if (timeDifference.hours <= 0 && timeDifference.minutes <= 0 && timeDifference.seconds <= 0) {
          setIsTimeUp(true);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [detailGoods]);

//경매상품 입찰정보
  const [bids, setBids] = useState([]);

  useEffect(() => {
    getBidsBygoodsSeq(params.goodsSeq)
        .then(response => {
            setBids(response.data.result);
        })
        .catch(e => {
            // console.error('에러:', e);
        })
    const sub = subscribeToBidUpdates(params.goodsSeq, setBids);
    return () => {
      sub.then(s => s.unsubscribe())
        .catch(e => {
        // console.error('에러',e);
        })
    }
  }, [params.goodsSeq]);
//경매모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidDTO, setBidDTO] = useState({
    goodsSeq: '',      
    bidAmount:''
  });
  const [bidAmount, setBidAmount] = useState('');
  const token = localStorage.getItem('suhwagdamToken') || sessionStorage.getItem('suhwagdamToken');
// console.log('토큰:', token);
// console.log(userId)
  const showModal = (seq) => {
    if(!token){
      sweet.fire({
        text: "먼저 로그인 해주세요.",
        icon: "error"
      });
      return
    }
    if(userPoint< detailGoods?.currentBidPrice){
      sweet.fire({
        text: "포인트를 충전해 주세요.",
        icon: "error"
      });
      return
    }
    if (detailGoods?.userAccountResponse?.accountId === userId) {
      sweet.fire({
        text: "판매자는 입찰할 수 없습니다.",
        icon: "error"
      });
      return;
    }


    setBidDTO({ ...bidDTO, goodsSeq: seq });
    setIsModalOpen(true);
  };
  const bidAmountFocus = () => {
    setBidAmount('');
  }

  const bidAmountHand = (e) => {
    let bidAmount = e.target.value;
    bidAmount = Number(bidAmount.replaceAll(',',''));
    if(isNaN(bidAmount)){
      setBidAmount(0);
    }else{
      setBidAmount(numberFormat(bidAmount));
    }
  }

  const bidOk = () => {
    setIsModalOpen(false);
    const price = bidAmount.replaceAll(',','');
    postbid ({
      goodsSeq: detailGoods.seq,
      bidAmount: price
    })
    .then(res => {
      // console.log(res)
      sweet.fire({
              text: "입찰성공",
              icon: "success"
            });
          })
    .catch(e => {
      // console.log(e)
      if(e.response && e.response.data && e.response.data.resultCode === "BIDDER_NOT_ALLOWED"){
        sweet.fire({
          text: "현재 금액의 마지막 입찰자 입니다.",
          icon: "warning",
        });
      }
      if(e.response && e.response.data && e.response.data.resultCode === "INVALID_BID_AMOUNT"){
        sweet.fire({
          text: "현재 가격보다 높은 금액으로 입찰해주세요.",
          icon: "warning",
        });
      }
      
    })
    setBidAmount('')
  };
  const bidCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (isModalOpen && isTimeUp) {
      setIsModalOpen(false);
    }
  }, [isModalOpen, isTimeUp]);

  // 그래프
  const data = bids.sort(
    (a, b) => new Date(a.bidTime) - new Date(b.bidTime)
  ).slice(-10)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc', color:'#8884d8' }}>
          <p>{`닉네임: ${payload[0].payload.userAccountResponse.nickname}`}</p>
          <p>{`입찰가격: ${numberFormat(payload[0].payload.bidAmount)}원`}</p>
        </div>
      );
    }

    return null;
  };
    return (
        <div style={{width:'100%'}}>
            <BaseDiv>
                <HDiv>
                  <ImgDiv>
                  <Carousel images={detailGoods && detailGoods.images} />
                  </ImgDiv>
                    <ContextDiv>
                        <TitleDiv>
                            <h2 style={{fontSize:'30px',marginTop:'20px'}}>{detailGoods?.title}</h2>
                        </TitleDiv>
                        <ConDiv>{detailGoods?.description}</ConDiv>
                        <TimeDiv><TimeT>마감까지</TimeT><TimeT2>{time.hours}시간 {time.minutes}분 {time.seconds}초</TimeT2></TimeDiv>
                        <BtnDiv>
                          <BtnInner><Butt background='#FFFEF8'color='#616060' width="98%" height="100%"
                                       media="true">
                            현재 가격&nbsp;:&nbsp;<Pricespan>{numberFormat(detailGoods?.currentBidPrice)}</Pricespan>원</Butt></BtnInner>
                          <BtnInner>
                            <Butt  disabled={isTimeUp}
                            cursor="pointer" width="98%" height="100%" 
                            onClick={() => showModal(detailGoods?.seq)}>입찰</Butt></BtnInner>
                        </BtnDiv>
                        <GraphDiv>
                          <Graph>
                          <ResponsiveContainer width={'100%'} height={250}>
                            <LineChart data={data}
                              margin={{ top: 15, right: 80, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey={'none'}/>
                              <YAxis />
                              <Tooltip content={<CustomTooltip />} /> 
                              <Line type="monotone" name="입찰가격" dataKey="bidAmount" stroke="#8884d8" />
                            </LineChart>
                            </ResponsiveContainer>
                          </Graph>
                        </GraphDiv>
                        <ActionText>경매현황</ActionText>
                    </ContextDiv>
                </HDiv>

                <div style={{width:'80%',height:'60px', display: 'flex', margin:'auto'}}>
                    <div style={{border:'1px solid #D0CFCF', width:'100%',margin:'auto'}}></div>
                </div>
                <p style={{marginBottom:'20px', color:'#404040', 
                          fontSize:'18px'}}>다른상품</p>
                <FootDiv>
                  <RelatedGoods currentGoodsSeq={Number(params.goodsSeq)} />
                </FootDiv>
            <StyledModal 
              open={isModalOpen}
              onCancel={bidCancel}
              footer={[
                <MBtn key="footer">
                <MBtnInner>
                <Butt key="back" onClick={bidCancel} width='98%' background='#FFFFFF' color='404040'>
                  취소
                </Butt>
                </MBtnInner>
                <MBtnInner>
                <Butt key="submit" cursor="pointer" onClick={bidOk} 
                      width='98%'>
                  입찰
                </Butt>
                </MBtnInner>
                </MBtn>
              ]}centered
              maskClosable={false} >
              <Mheaed>남은 시간<TimeT2 background='none' width='auto' height='auto'>{time.hours}시간 {time.minutes}분 {time.seconds}초</TimeT2></Mheaed>
              <MNow>현재 가격&nbsp;&nbsp; <Pricespan>{numberFormat(detailGoods?.currentBidPrice)}</Pricespan>원</MNow>
              <MInput>금액&nbsp;:&nbsp;<MInputInner type='text' 
                                        value={bidAmount} onChange={bidAmountHand} 
                                        onFocus={bidAmountFocus} name="bidAmount"></MInputInner>원</MInput>
            </StyledModal>
            </BaseDiv>

        </div>
    );
};

export default Detail;