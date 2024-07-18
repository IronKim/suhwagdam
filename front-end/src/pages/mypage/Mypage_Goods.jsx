import React, {useState, useEffect, useRef}from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import { useRecoilValue} from 'recoil';
import { userState } from '../../atoms/userState';
import { getMyGoodsList,deliveryStatus } from '../../api/GoodsApiService';
import { getSuccessBidUser } from '../../api/BidApiService';
import { getSuccessBidData } from '../../api/AuthApiService';
import { useInView } from 'react-intersection-observer';
import ItemEmpty from '../../components/ItemEmpty';
import sweet from 'sweetalert2'; 

const Inner = styled.div`
    width: 70%;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 90%;
        }
`
const GoodsCard = styled.div`
    /* border: 1px solid blue; */
    width: 100%;
    /* height: 15%; */
    height: 120px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 99%;
        }
`
const CardInner = styled.div`
    /* border: 1px solid red; */
    width: 97%;
    height: 90%;
    border-radius: 15px;
    display: flex;
`
const GoodsPhoto = styled.div`
    /* border: 1px solid blue; */
    border-radius: 15px;
    width: 130px;
    height: 100%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const GoodsContext = styled.div`
    /* border: 1px solid orange; */
    height: 100%;
    width: 55%;
    margin-left: 5%;
    padding-top: 2%;
    @media (max-width: 639px){
        width: 40%;
    }
`
const GoodsContextState = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    color: #FF9900;
    font-weight: bold;
`
const GoodsContextTitle = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const GoodsContextPrice = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    padding-top: 1%;
`
const ButtDiv = styled.div`
    /* border: 1px solid red; */
    width: auto;
    height: 100%;
    display: flex;
    align-items: end;
    margin-left: auto;
` 
const Mypage_Goods = () => {
    const user = useRecoilValue(userState); //아톰이
    // console.log(user);
    const [goodsList,setGoodsList] = useState([]);
    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

      useEffect(() => {
        getMyGoodsList(user.accountId)
        .then(res => {
            // console.log(res);
            setGoodsList(res.data.result);
                })
          .catch(e => {
            // console.log(e);
          })
      }, []);
      
      useEffect(() => {
        //nView 값 변경시 itemsShow 업데이트
        if (inView && !prevInView.current) {
            setListShow(prevItems => prevItems + 8);
        }
        prevInView.current = inView;

    }, [inView]);
    const getSeq = ({ item }) => {
        getSuccessBidUser(item?.seq)
            .then(res => {
                // console.log(res)
                const accountId = res.data.result[0]?.userAccountDto?.accountId;
                // console.log(accountId);
                if (accountId) {
                    getSuccessBidData(accountId).then(res =>{
                        sweet.fire({
                            html: `
                              <div><strong>이름:</strong> ${res.data.name}</div>
                              <div><strong>전화번호:</strong> ${res.data.number}</div>
                              <div><strong>주소:</strong> ${res.data.address}</div>
                              <div><strong>상세주소:</strong> ${res.data.detailedAddress}</div>
                            `,
                            icon: "success"
                          });
                    }).catch(e => {
                        sweet.fire({
                            text:'아직 배송지가 입력되지 않았어요',
                            icon: "error"
                        })
                    })
                }
            })
            .catch(error => {
                
            });
    };
    const getDeliverySeq = ({ item }) => {
        sweet.fire({
          title: "상품 전달 완료",
          text: "상품 전달 완료 처리 하시겠습니까?",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          cancelButtonText: "취소",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "전달 완료"
        }).then((result) => {
          if (result.isConfirmed) {
            deliveryStatus(item?.seq).then(res => {
                sweet.fire({
                    text: "배송완료 처리되었습니다.",
                    icon: "success"
                  });
            })
          } else {
            sweet.fire({
              text: "취소되었습니다.",
              icon: "info"
            });
          }
        });
      };
    
    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
             <Inner>
                {goodsList.length > 0 ? (
                    goodsList.slice(0, listShow).map((item, index) => (
                        <GoodsCard key={index}>
                            <CardInner>
                                <GoodsPhoto><img src={item && item.images} alt='상품 이미지'></img></GoodsPhoto>
                                <GoodsContext>
                                    <GoodsContextState>{item?.title}</GoodsContextState>
                                    <GoodsContextTitle>{item?.description}</GoodsContextTitle>
                                    <GoodsContextPrice>최종 낙찰 금액: {item?.currentBidPrice} 원</GoodsContextPrice>
                                </GoodsContext>
                               <ButtDiv><Butt fontSize="14px" onClick={() => getSeq({item})}  cursor="pointer" width="auto" disabled={item.status !== 'COMPLETE'}>배송지</Butt></ButtDiv>
                               <ButtDiv><Butt fontSize="14px"  onClick={() => getDeliverySeq({item})}  cursor="pointer" width="auto" disabled={item.status !== 'COMPLETE' || item.deliveryStatus == 'COMPLETE'}>배송완료</Butt></ButtDiv>
                            </CardInner>
                        </GoodsCard>
                    ))
                ) : (
                    <ItemEmpty message='등록한 상품이 없습니다.'/>
                )}
                
                <div ref={ref} /> 
            </Inner>
        </div>
    );
};

export default Mypage_Goods;