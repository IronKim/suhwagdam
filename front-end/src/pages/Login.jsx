import React from 'react';
import styled from "styled-components";
import Butt from '../components/Butt'

const InnerDiv = styled.div`
/* border: 1px solid red; */

@media (min-width: 800px){
    margin: auto;
    width: 800px;
}
`
const NameDiv = styled.div`
    /* border: 1px solid green; */
    height: 100px;
    margin-top: 5%;
`
const ContentDiv = styled.div`
    /* border: 1px solid red;  */
    margin-top:10%;

`
const InfoCate = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: center;
`
const CateTitle = styled.div`
    /* border: 1px solid rebeccapurple; */
    width: 50%;
    text-align: center;
    font-size: 15px;
    margin-top: 8%;
    margin-bottom: 2%;
    @media (max-width: 639px){
            width: 30%;
        }
`
const StyledInput = styled.input`
        border: 1px solid #E8E8E8;
        width: 50%;
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
            width: 70%;
        }
    `
const Login = () => {
    return (
        <div>
            <InnerDiv>
                <NameDiv><h1 style={{marginLeft:'20px'}}>로그인</h1></NameDiv>
                <ContentDiv>
                        <CateTitle>아이디</CateTitle>
                    <InfoCate>
                        <StyledInput type="text"/>
                    </InfoCate>
                        <CateTitle>비밀번호</CateTitle>
                    <InfoCate>
                        <StyledInput type="password"/>
                    </InfoCate>
                    <div style={{width:'100%', textAlign: 'center', marginTop:'10%'}}>
                    <Butt cursor="pointer">로그인</Butt> 
                    </div>
                </ContentDiv>
            </InnerDiv>
        </div>
    );
};

export default Login;