import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '../asset/images/suhwagdam_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import {RxHamburgerMenu} from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Sidebar from './Sidebar';
import {IoCloseOutline} from "react-icons/io5";
import {useRecoilState} from "recoil";
import {userState} from "../atoms/userState";
import sweet from "sweetalert2";

const HeaderContainer = styled.div` // 헤더 전체 컨테이너 스타일
    border-bottom: 1px solid lightgray;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    @media (max-width: 639px) {
        height: 100px;
    }
`;

const Logo = styled(Link)` // 로고 스타일
    margin: auto;
    height: 100px;
    justify-content: center;
    justify-items: center;
    left: 340px;
    top: 20px;
    display: flex;  
    
    @media (max-width: 1599px) {
        height: 90px;
    }
    @media (max-width: 1399px) {
        height: 90px;
    }
    @media (max-width: 1299px) {
        height: 80px;
    }
    @media (max-width: 1199px) {
        height: 70px;
    }

    @media (max-width: 849px) {
        height: 70px;
    }

    @media (max-width: 639px) {
        height: 65px;
        margin-left: 15px;
    }
`;

const Login = styled.div` 
    width: 150px;
    height: 50px;
    align-items: center;
    display: flex;
    font-size: 20px;
    margin: auto;
    justify-content: center;

    P {
        margin: 0 5px;
        cursor: pointer;
        color: #404040;

        &:hover {
            color: #5AC463;
            text-decoration: underline;
        }
    }
    
    @media (max-width: 639px) {
        display: none;
    }
`;   

const HamburgerBtn = styled.div`
    display: none;
    
    @media (max-width: 639px) {
        /* border: 1px solid black; */
        width: 25px;
        height: 25px;
        position: fixed;
        display: block;
        right: 25px;
        top: 15px;
        font-size: 35px;
        color: #404040;
        z-index: 999;
    }
`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [userData, setUserData] = useRecoilState(userState);

    const navigate = useNavigate(); // useNavigate로 페이지 이동 1

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    // 함수형 컴포넌트에서 useEffect를 사용하여 컴포넌트 마운트 상태에 따라 특정 작업을 처리 2
    useEffect(() => {
        setIsOpen(false);
    },[navigate])
  
    const logout = () => {
        sweet.fire({
            icon: 'success',
            title: '로그아웃 되었습니다.',
            showConfirmButton: false,
            timer: 1500

        }).then(() => {

            localStorage.removeItem('suhwagdamToken');
            sessionStorage.removeItem('suhwagdamToken');
            setUserData({accountId: '', nickname: ''});
        })

    }

    return (
        <div style={{width: '100%'}}>
            <HeaderContainer>
                <Logo to={'/'}><img style={{ width: '100%', height: '100%' }} src={ logo } alt='Suhwagdam Logo'></img></Logo>
                <HamburgerBtn onClick={ toggleMenu }>
                    { isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
                </HamburgerBtn>
               
                <Login visible={ visible }>
                    {
                        userData.accountId ?
                            <p>{userData.nickname}님</p>
                            :
                            <Link to='/join' style={{ textDecoration: 'none' }}><p>회원가입</p></Link>
                    }
                    |
                    {
                        userData.accountId ?
                            <Link to={'/'} style={{textDecoration:'none'}} ><p onClick={logout}>로그아웃</p></Link>
                            :
                            <Link to='/login' style={{ textDecoration: 'none' }}><p>로그인</p></Link>
                    }
                </Login>
            </HeaderContainer>
            <Sidebar isOpen={isOpen} />
        </div>
    );
};

export default Header;