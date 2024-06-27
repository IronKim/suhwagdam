import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { PiCheckFat } from "react-icons/pi";
import Butt from '../components/Butt'
import {useNavigate, useSearchParams} from "react-router-dom";
import {verify} from "../api/AuthApiService";
import {BiMessageError} from "react-icons/bi";

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
    const [searchParams] = useSearchParams();
    const queryList = [...searchParams];
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const certificationToken = queryList[0][1];
        const email = queryList[1][1];

        verify(email, certificationToken)
            .then(response => {
                setIsSuccess(true)
            })
            .catch(error => {
                setIsSuccess(false)
            })
    }, []);

    return (
        <div style={{width:'100%'}}>
            <BaseDiv>
            <PiCheckFatDiv>
                {isSuccess ? <PiCheckFat style={{width: '100%', height: '100%', opacity: 0.7}}/> : <BiMessageError style={{ width: '100%', height: '100%', opacity: 0.7 }} />}
            </PiCheckFatDiv>
            <LoginGo>
                <div style={{fontSize:'30px'}}>{isSuccess ? <div> 회원가입이 완료되었습니다. </div> : <div> 회원가입이 실패했습니다 다시 시도해 주세요 </div>}</div>
              <br></br>
              <br></br>
              <Butt onClick={() => navigate('/login')}>로그인으로</Butt>
            </LoginGo>
            </BaseDiv>
        </div>
    );
};

export default Confirm;