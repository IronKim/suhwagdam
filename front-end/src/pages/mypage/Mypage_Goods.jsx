import React, {useState, useEffect}from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import { useRecoilValue} from 'recoil';
import { userState } from '../../atoms/userState';
import { getMyGoodsList } from '../../api/GoodsApiService';

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
    width: 100%;
    height: 15%;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
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
const Mypage_Goods = () => {
    const user = useRecoilValue(userState); //아톰이
    console.log(user);
    const [goodsList,setGoodsList] = useState([]);

      useEffect(() => {
        getMyGoodsList(user.accountId)
        .then(res => {
            console.log(res);
            setGoodsList(res.data.result);
                })
          .catch(e => {
            console.log(e);
          })
      }, []);
      
    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center'}}>
            <Inner>
            {goodsList?.map((item, index) =>(
                    <GoodsCard>
                    <CardInner>
                    <GoodsPhoto><img src='{item && item.images}'></img></GoodsPhoto>
                    <GoodsContext>
                        <GoodsContextState>{item?.title}</GoodsContextState>
                        <GoodsContextTitle>{item?.description}</GoodsContextTitle>
                        <GoodsContextPrice>입찰 금액 :{item?.currentBidPrice} 원</GoodsContextPrice>
                    </GoodsContext>
                    <ButtDiv><Butt cursor="pointer" width="auto">배송</Butt> </ButtDiv>
                    </CardInner>
                    </GoodsCard>
            )
            )}
            </Inner>
        </div>
    );
};

export default Mypage_Goods;