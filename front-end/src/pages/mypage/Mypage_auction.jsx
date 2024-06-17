import React from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'

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
    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
           <GoodsCard>
                <CardInner>
                <GoodsPhoto><img src='https://shop-phinf.pstatic.net/20230616_83/1686882884732XWOxI_JPEG/10805132545701427_432852016.jpg?type=m510'></img></GoodsPhoto>
                <GoodsContext>
                    <GoodsContextState>dd</GoodsContextState>
                    <GoodsContextTitle>맛좋은 자두야 복숭아야 뭔지몰라</GoodsContextTitle>
                    <GoodsContextPrice>내가 입찰한 금액 : 원</GoodsContextPrice>
                </GoodsContext>
                <ButtDiv><Butt cursor="pointer" width="auto">배송</Butt> </ButtDiv>
                </CardInner>
            </GoodsCard>
        </div>
    );
};

export default Mypage_auction;