import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Butt from '../../components/Butt'
import {userState} from "../../atoms/userState";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userUpdate } from '../../api/AuthApiService';
import sweet from 'sweetalert2'; 
import 'sweetalert2/dist/sweetalert2.min.css';

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
    const userData = useRecoilValue(userState);
    const setUserData = useSetRecoilState(userState);
    const [update, setUpdate] = useState({
        email: userData.email,
        password: '',
        nickname: userData.nickname
    });

    useEffect(() => {
        setUpdate({
            email: userData.email,
            password: '',
            nickname: userData.nickname
        });
    }, [userData]);

    const updateInfo = (e) => {
        const {name, value} = e.target;
        setUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
        const nicknamePattern = /^.{2,8}$/;

        if (!update.email.includes('@') || !update.email.includes('.')) {
            sweet.fire('올바른 이메일 형식을 입력해주세요.');
            return;
        }
        if (!passwordPattern.test(update.password)) {
            sweet.fire('비밀번호는 영문자와 숫자 조합으로 8~20자 이어야 합니다.');
            return;
        }
        if (!nicknamePattern.test(update.nickname)) {
            sweet.fire('닉네임은 2~8자 이어야 합니다.');
            return;
        }

        const updateData = {
            email: update.email,
            password: update.password,
            nickname: update.nickname
        }

        userUpdate(userData.accountId, updateData) //api 호출
            .then(res => {
                console.log('업데이트 성공:', userUpdate);
                
                // Recoil 상태 업데이트
                const updatedUserData = {
                    ...userData,
                    email: update.email,
                    nickname: update.nickname
                };
                setUserData(updatedUserData)

                sweet.fire('정보가 성공적으로 수정되었습니다.')
            })
            .catch(err => {
                console.error('업데이트 실패:', err)
                console.log(updateData)
                sweet.fire('정보 수정에 실패했습니다.')
            });
        }

    return (
        <div style={{height:'100%', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <Inner>
            <InfoCate>
                <CateTitle>아이디</CateTitle>
                <InfoId>{userData.accountId}</InfoId>
            </InfoCate>
            <InfoCate>
                <CateTitle>이메일</CateTitle>
                <StyledInput type="text"
                             name="email"
                             value={update.email}
                             onChange={updateInfo}
                             placeholder={userData.email}>
                </StyledInput>
            </InfoCate>
            <InfoCate>
                <CateTitle>비밀번호</CateTitle>
                <StyledInput type="password"
                             name="password"
                             value={update.password}
                             onChange={updateInfo}>
                </StyledInput>
            </InfoCate>
            <InfoCate>
                <CateTitle>닉네임</CateTitle>
                <StyledInput type="text"
                             name="nickname"
                             value={update.nickname}
                             onChange={updateInfo}
                             placeholder={userData.nickname}>
                </StyledInput>
            </InfoCate>

            <ButtDiv>
            <Butt cursor="pointer" width="150px" onClick={handleUpdate}>수정</Butt>
            </ButtDiv>
            </Inner>
        </div>
    );
};

export default Mypage_info;