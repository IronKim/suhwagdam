import React from 'react';
import styled from "styled-components";
import { BiMessageError } from "react-icons/bi";
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
const BiMessageErrorDiv = styled.div`
      /* border: 1px solid blue; */
  width: 50%;
  height: 50%;
  margin: auto;
`
const Error = styled.div`
  /* border: 1px solid rebeccapurple; */
  width: 50%;
  margin: auto;
  text-align: center;
`

const ConfirmNo = () => {
    return (
        <div style={{width:'100%'}}>
        <BaseDiv>
            <BiMessageErrorDiv>
                <BiMessageError style={{ width: '100%', height: '100%', opacity: 0.7 }} />
            </BiMessageErrorDiv>
            <Error>
            <br></br>
            <br></br>
              <div style={{fontSize:'30px'}}>인증이 잘못되었습니다.</div>
              <div style={{fontSize:'30px'}}>다시 시도해 주세요.</div>
              <br></br>
              <br></br>
              <Butt>로그인으로</Butt>
            </Error>
        </BaseDiv>
        </div>
    );
};

export default ConfirmNo;