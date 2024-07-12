import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { userState } from '../../atoms/userState';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { getPaymentList } from '../../api/PaymentApiService';
import ItemEmpty from '../../components/ItemEmpty';
import coinImg from '../../asset/images/coin.png';
import { getUserData } from '../../api/AuthApiService';

const Inner = styled.div`
    width: 70%;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 90%;
        }
`
const PaymentCard = styled.div`
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
const PaymentPhoto = styled.div`
    /* border: 1px solid blue; */
    border-radius: 15px;
    min-width: 110px;
    height: 100%;
    overflow: hidden;
    margin-left: 2%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const PaymentContext = styled.div`
    /* border: 1px solid orange; */
    height: 100%;
    width: 55%;
    margin-left: 5%;
    padding-top: 2%;
    @media (max-width: 639px){
        width: 40%;
    }
`
const PaymentContextState = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    color: #FF9900;
    font-weight: bold;
`
const PaymentContextDate = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 2%;
    padding-bottom: 2%;
    color: #9E9E9E;
`
// const PaymentContextMethod = styled.p`
//     /* border: 1px solid orange; */
//     margin:0;
//     font-weight: bold;
//     font-size: 20px;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     padding-top: 2%;
// `
const PaymentContextPrice = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 2%;
` 
    const Mypage_paymentlist = () => {
    const user = useRecoilValue(userState); //아톰
    const [paymentList, setPaymentList] = useState([]);
    const accountId = user.accountId;

    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    const [listShow, setListShow] = useState(8); // 한 번에 보여줄 아이템 수

    useEffect(() => {
        if (accountId) {
            getPaymentList()
                .then(res => {
                    console.log('API 연결:', res.data);
                    setPaymentList(res.data.result || res.data)  
        
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
            <div style={{width: '500px', fontSize: '28px'}}><p>현재 포인트 {user.point?.toLocaleString()}원 :)</p></div>
            {paymentList.length > 0 && paymentList.slice(0, listShow).map((item, index) => (
                
                    <PaymentCard key={index}>
                        <CardInner>
                        <PaymentPhoto><img src={coinImg} alt='coin img'></img></PaymentPhoto>
                        <PaymentContext>
                            <PaymentContextState>충전 완료</PaymentContextState>
                            <PaymentContextDate>{new Date(item.createdAt).toLocaleString()}</PaymentContextDate>
                            {/* <PaymentContextMethod>{item.selectedMethod}</PaymentContextMethod> */}
                            <PaymentContextPrice>{item.amount.toLocaleString()}원</PaymentContextPrice>
                        </PaymentContext>
                        </CardInner>
                    </PaymentCard>
                )
           )}
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
            </Inner>
            {paymentList.length === 0 && <ItemEmpty/>}
        </div>
    );
};

export default Mypage_paymentlist;