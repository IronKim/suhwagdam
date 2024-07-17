import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { userState } from '../../atoms/userState';
import { getMyBidsList } from '../../api/BidApiService';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import ItemEmpty from '../../components/ItemEmpty';
import Butt from '../../components/Butt'
import { Link } from 'react-router-dom';

const ButtDiv = styled.div`
    /* border: 1px solid red; */
    width: auto;
    height: 100%;
    display: flex;
    align-items: end;
    margin-left: auto;
` 
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
    width: 70%;
    /* height: 15%; */
    height: 120px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 3%;
    margin-top: 5%;
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
    min-width: 110px;
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
    font-size: 20px;
`
const Mypage_bid = () => {
    const user = useRecoilValue(userState); //아톰
    const accountId = user.accountId;
    const [successBid,setSuccessBid] = useState([])
    
    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

    
    useEffect(() => {
        if (accountId) {
            getMyBidsList(accountId)
                .then((res) => {
                    setSuccessBid(res.data.result)
                })
                .catch((e) => {
                });
        }
    }, [accountId]);
    
        const dateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    console.log(successBid)
    useEffect(() => {
        //nView 값 변경시 itemsShow 업데이트
        if (inView && !prevInView.current) {
            setListShow(prevItems => prevItems + 8);
        }
        prevInView.current = inView;

    }, [inView]);
    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
            <Inner>
            {successBid.length === 0 ? (
            <ItemEmpty message='참여한 경매내역이 없습니다.'/>
            ) : (
                successBid.slice(0, listShow).map((bid) => (
                    <GoodsCard key={bid.seq}>
                        <CardInner>
                            <GoodsPhoto>
                                <img src={bid?.goodsResponse.images && bid?.goodsResponse.images.length > 0 ? bid?.goodsResponse.images[0] : '이미지가 없음'} alt="상품 이미지" />
                            </GoodsPhoto>
                            <GoodsContext>
                                <GoodsContextState>{bid?.goodsResponse.title}</GoodsContextState>
                                <GoodsContextTitle>{bid?.goodsResponse.description}</GoodsContextTitle>
                                <GoodsContextPrice>낙찰 시간 : {dateTime(bid?.goodsResponse.deadline)}</GoodsContextPrice>
                                <GoodsContextTitle>낙찰 금액 : {bid?.bidAmount}원</GoodsContextTitle>
                            </GoodsContext>
                            <Link to='/mypage/address'><ButtDiv><Butt cursor="pointer" width="auto">배송지</Butt></ButtDiv></Link>
                        </CardInner>
                    </GoodsCard>
                ))
            )}
            <div ref={ref} /> 
            </Inner>
        </div>
    );
};

export default Mypage_bid;