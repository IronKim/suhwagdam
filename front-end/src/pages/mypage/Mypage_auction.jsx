import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import { userState } from '../../atoms/userState';
import { getAuctionList } from '../../api/GoodsApiService';
import { getMyBidsList } from '../../api/BidApiService';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

const Inner = styled.div`
    width: 70%;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 99%;
        }
`
const GoodsCard = styled.div`
    /* border: 1px solid blue; */
    width: 70%;
    height: 15%;
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
`
const ButtDiv = styled.div`
    /* border: 1px solid red; */
    width: auto;
    height: 100%;
    display: flex;
    align-items: end;
    margin-left: auto;
` 
const Mypage_auction = () => {
    const user = useRecoilValue(userState);
    const [auctionList, setAuctionList] = useState([]);
    const accountId = user.accountId;

    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

    useEffect(() => {
        if (accountId) {
            
            getAuctionList(accountId)
                .then((res) => {
                    console.log('API response:', res.data);
                    setAuctionList(res.data.result || res.data)
                    
                })
                .catch((err) => {
                    console.error('API error:', err); 
                });
        }
    }, [accountId]);
    useEffect(() => {
        if (accountId) {
            
            getMyBidsList(accountId)
                .then((res) => {
                    console.log('낙찰낙찰:', res.data);
                })
                .catch((err) => {
                    console.error('API error:', err); 
                });
        }
    }, [accountId]);

    useEffect(() => {
        // Infinite Scroll을 위해 inView 값이 변경될 때마다 itemsShow 상태 업데이트
        if (inView && !prevInView.current) {
            setListShow(prevItems => prevItems + 8);
        }
        prevInView.current = inView;

    }, [inView]);

const showItems = auctionList.slice(0, listShow);

    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
            <Inner>
            {auctionList.length > 0 ? (
               showItems.map((item, index) => (
                    <GoodsCard key={index}>
                        <CardInner>
                        <GoodsPhoto><img src={item && item.images[0]} alt='auction img'></img></GoodsPhoto>
                        <GoodsContext>
                            <GoodsContextState>{item.title}</GoodsContextState>
                            <GoodsContextTitle>{item.description}</GoodsContextTitle>
                            <GoodsContextPrice>내가 입찰한 금액 : {item.currentBidPrice}원</GoodsContextPrice>
                        </GoodsContext>
                        <ButtDiv><Butt cursor="pointer" width="auto">배송</Butt> </ButtDiv>
                        </CardInner>
                    </GoodsCard>
                ))
           ) : (
               <p>경매 목록이 없습니다.</p>
           )}
            </Inner>
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
        </div>
    );
};

export default Mypage_auction;