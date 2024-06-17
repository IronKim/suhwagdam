import React from 'react';
import styled from "styled-components";
import { PiCheckFat } from "react-icons/pi";
import Butt from '../components/Butt'

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

const ConfirmOk = () => {
    return (
        <div style={{width:'100%'}}>
            <BaseDiv>
            <PiCheckFatDiv>
              <PiCheckFat style={{ width: '100%', height: '100%', opacity: 0.7 }}/>
            </PiCheckFatDiv>
            <LoginGo>
              <div style={{fontSize:'30px'}}>회원가입이 완료되었습니다.</div>
              <br></br>
              <br></br>
              <Butt>로그인으로</Butt>
            </LoginGo>
            http://localhost:3000/?cerfitication=asdsadsadsadsads&email=sdkl;fks@g,ao;
            인증번호,이메일값 뽑아내서 일치하는지 api로 확인 후 회원가입완료인지 다시 인증인지 로그인인지
            </BaseDiv>
        </div>
    );
};

export default ConfirmOk;