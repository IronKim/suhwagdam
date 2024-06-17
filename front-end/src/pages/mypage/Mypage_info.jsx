import React from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'

const Inner = styled.div`
    /* border: 1px solid red; */
    width: 70%;
    height: 70%;
`
const InfoCate = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3%;
`
const CateTitle = styled.div`
    /* border: 1px solid rebeccapurple; */
    width: 30%;
    text-align: center;
    font-size: 18px;
    @media (max-width: 639px){
        font-size: 15px;
        }
    @media (max-width: 359px){
        font-size: 12px;
        }
`
const StyledInput = styled.input`
    border: 1px solid #E8E8E8;
    width: 70%;
    height: 35px;
    font-size: 25px;
    border-radius: 8px;
    padding: 5px 10px 5px 10px;

    &::placeholder{
        font-size: 15px;
        color: #9E9E9E;
    }
    &:focus{
        border: 1px solid #5AC463 !important;
        outline: none;
    }
    @media (max-width: 639px){
        width: 93%;
    }
    `
const InfoId = styled.div`
    width: 70%;
    height: 35px;
    font-size: 25px;
    padding: 5px 10px 5px 10px;
    margin-bottom: 3%;
    &::placeholder{
        font-size: 15px;
        color: #9E9E9E;
    }
    &:focus{
        border: 1px solid #5AC463 !important;
        outline: none;
    }
    @media (max-width: 639px){
        width: 93%;
    }
    `
    const ButtDiv = styled.div`
        /* border: 1px solid red; */
        display: flex;
        justify-content: flex-end;
        margin-top: 5%;
    `
const Mypage_info = () => {

    

    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <Inner>
            <InfoCate>
                <CateTitle>아이디</CateTitle>
                <InfoId></InfoId>
            </InfoCate>
            <InfoCate>
                <CateTitle>이메일</CateTitle>
                <StyledInput type="text"/>
            </InfoCate>
            <InfoCate>
                <CateTitle>비밀번호</CateTitle>
                <StyledInput type="password"/>
            </InfoCate>
            <InfoCate>
                <CateTitle>닉네임</CateTitle>
                <StyledInput type="text"/>
            </InfoCate>


            
            <ButtDiv>
            <Butt cursor="pointer" width="150px">수정</Butt> 
            </ButtDiv>
            </Inner>
        </div>
    );
};

export default Mypage_info;