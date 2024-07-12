import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { userState } from '../../atoms/userState';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { getAuctionList } from '../../api/GoodsApiService';
import ItemEmpty from '../../components/ItemEmpty';

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
    height: 120px;
    /* height: 15%; */
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
    padding-top: 2%;
`
const GoodsContextPrice = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    padding-top: 1%;
` 
    const Mypage_auction = () => {
    const user = useRecoilValue(userState); //아톰
    const [auctionList, setAuctionList] = useState([]);
    const accountId = user.accountId;

    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

    useEffect(() => {
        if (accountId) {
            getAuctionList(accountId)
                .then(res => {
                    console.log('API 연결:', res.data);
                    setAuctionList(res.data.result || res.data)
                    
                })
                .catch(err => {
                    console.error('API 연결 실패:', err); 
                });
        }
    }, [accountId]);

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
            {auctionList.slice(0, listShow).map((item, index) => (
                    <GoodsCard key={index}>
                        <CardInner>
                        <GoodsPhoto><img src={item?.goodsResponse.images} alt='auction img'></img></GoodsPhoto>
                        <GoodsContext>
                            <GoodsContextState>{item?.goodsResponse.title}</GoodsContextState>
                            <GoodsContextTitle>{item?.goodsResponse.description}</GoodsContextTitle>
                            <GoodsContextPrice>내가 입찰한 금액 : {item?.bidAmount}원</GoodsContextPrice>
                        </GoodsContext>
                        </CardInner>
                    </GoodsCard>
                )
           )}
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
            {auctionList.length === 0 && <ItemEmpty/>}
            </Inner>
        </div>
    );
};

export default Mypage_auction;