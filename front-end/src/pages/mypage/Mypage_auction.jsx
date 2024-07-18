import React, { useEffect, useState } from 'react';
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
    max-width: 130px;
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
    font-size: 17px;
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

    useEffect(() => {
        if (accountId) {
            
            getAuctionList(accountId)
                .then(res => {
                    setAuctionList(res.data.result || res.data)
                })
                .catch(e => {
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

    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
            <Inner>
                {auctionList.length === 0 ? (
                    <ItemEmpty message='참여한 경매 내역이 없습니다.'/>
                ) : (
                    auctionList.map((item, index) => (
                        <GoodsCard key={index}>
                            <CardInner>
                                <GoodsPhoto>
                                    <img src={item?.goodsResponse.images} alt='auction img' />
                                </GoodsPhoto>
                                <GoodsContext>
                                    <GoodsContextState>{item?.goodsResponse.title}</GoodsContextState>
                                    <GoodsContextTitle>{item?.goodsResponse.description}</GoodsContextTitle>
                                    <GoodsContextPrice>입찰시간 : {dateTime(item?.bidTime)}</GoodsContextPrice>
                                    <GoodsContextTitle>내가 입찰시도한 금액 : {item?.bidAmount}원</GoodsContextTitle>
                                </GoodsContext>
                            </CardInner>
                        </GoodsCard>
                    ))
                )}
            </Inner>
        </div>
    );
};

export default Mypage_auction;