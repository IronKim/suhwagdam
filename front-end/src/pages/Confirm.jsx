import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { PiCheckFat } from "react-icons/pi";
import Butt from '../components/Butt'
import {useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {verify} from "../api/AuthApiService";

const BaseDiv = styled.div`
/* border: 1px solid red; */
  width: 1200px;
  height: 800px;
  margin: auto;
  margin-top: 5%;

  @media (max-width: 1199px) {
    width: 97%;
    padding: 0 10px;
  }
`
const PiCheckFatDiv = styled.div`
  /* border: 1px solid blue; */
  width: 50%;
  height: 50%;
  margin: auto;
`
const LoginGo = styled.div`
  /* border: 1px solid rebeccapurple; */
  width: 50%;
  margin: auto;
  text-align: center;
`

const Confirm = () => {
  const navigate = useNavigate();
    // const [isSuccess, setIsSuccess] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const certificationToken = searchParams.get('certificationToken');
    const email = searchParams.get('email');
    
    useEffect(() => {
      verify(email, certificationToken)
          .then(() => {
              // setIsSuccess(true);
          })
          .catch(() => {
              // setIsSuccess(false);
          });
    }, [certificationToken, email]); 
    return (
        <div style={{width:'100%'}}>
            <BaseDiv>
            <PiCheckFatDiv>
                <PiCheckFat style={{width: '100%', height: '100%', opacity: 0.7}}/> 
            </PiCheckFatDiv>
            <LoginGo>
                <div style={{fontSize:'30px'}}><div> 회원가입이 완료되었습니다. </div> </div>
              <br></br>
              <br></br>
              <Butt cursor="pointer" onClick={() => navigate('/login')}>로그인으로</Butt>
            </LoginGo>
            </BaseDiv>
        </div>
    );
};

export default Confirm;