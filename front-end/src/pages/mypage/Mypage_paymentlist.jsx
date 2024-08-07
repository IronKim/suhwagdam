import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { userState } from '../../atoms/userState';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { getPaymentList } from '../../api/PaymentApiService';
import coinImg from '../../asset/images/coin.png';
import { Link } from 'react-router-dom';
import smile from '../../asset/images/smile.png';

const Inner = styled.div`
    width: 70%;
    @media (max-width: 1000px){
        width: 90%;
        }
    @media (max-width: 639px){
        width: 90%;
        margin: auto;
        }
`
const PointImg = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    justify-content: center;
    img {
        width: 500px;

        @media (max-width: 639px){
            width: 80%;
        }
    }
`
const PointContainer = styled.div`
    /* border: 1px solid red; */
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: right;
    @media (max-width: 639px){
    }
`
const PointP = styled.p`
    /* border: 1px solid black; */
    width: 140px;
    height: 20px;
    font-size: 20px;
    color: #616060;
    @media (max-width: 639px){
        font-size: 13px;
        width: 100px;
    }
`
const PointView = styled.div`
    /* border: 1px solid blue; */
    width: 180px;
    height: 50px;
    font-size: 35px;
    flex-direction: column;
    margin-left: 170px;
    @media (max-width: 639px){
        width: 120px;
        font-size: 25px;
        margin-left: 0;
    }
`
const PointRecharge = styled.button`
    width: 110px;
    height: 40px;
    background-color: #5AC463;
    color: white;
    justify-content: center;
    border: 1px solid #5AC463;
    border-radius: 8px;
    cursor: pointer;
    @media (max-width: 639px){
        width: 80px;
        height: 30px;
    }
/* 
    &:hover {
        background-color: #5AC463;
        border: none;
        color: white;
        transition: background-color 0.5s ease
    } */
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
    padding-top: 1%;
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
    @media (max-width: 639px){
        width: 120px;
        white-space: normal; 
        word-wrap: break-word;
        &::after {
            white-space: pre-line;
            word-break: break-word;
        }
    }
`
const PaymentContextPrice = styled.p`
    /* border: 1px solid orange; */
    margin:0;
    font-weight: bold;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
                    setPaymentList(res.data.result || res.data)  
                })
                .catch(err => {
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

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleString();
        if (formattedDate.includes('오전')) {
            return formattedDate.split('오전').join('<br />오전');
        } else if (formattedDate.includes('오후')) {
            return formattedDate.split('오후').join('<br />오후');
        }
        return formattedDate;
    };

    const renderFormattedDate = (dateString) => {
        const parts = formatDate(dateString).split('<br />');
        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <div style={{height:'100%', display: 'flex', right: '500px', justifyContent: 'center'}}>
            <Inner>
                <PointImg><img src={smile} alt='smile'/></PointImg>
                <PointContainer>
                    <PointP>보유 포인트</PointP>
                    <PointView>{user.point?.toLocaleString()}P</PointView>
                    <Link to='/payment'><PointRecharge>포인트 충전</PointRecharge></Link>
                </PointContainer>
            {paymentList.length > 0 && paymentList.slice(0, listShow).map((item, index) => (
                    <PaymentCard key={index}>
                        <CardInner>
                        <PaymentPhoto><img src={coinImg} alt='coin img'></img></PaymentPhoto>
                        <PaymentContext>
                            <PaymentContextState>충전 완료</PaymentContextState>
                            <PaymentContextDate>{renderFormattedDate(item.createdAt)}</PaymentContextDate>
                            <PaymentContextPrice>{item.amount.toLocaleString()}원</PaymentContextPrice>
                        </PaymentContext>
                        </CardInner>
                    </PaymentCard>
                )
           )}
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
            </Inner>
        </div>
    );
};

export default Mypage_paymentlist;
