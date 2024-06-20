import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../asset/images/suhwagdam_logo.png';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from './Sidebar';
import { IoCloseOutline } from "react-icons/io5";

const HeaderContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;

    @media (max-width: 1199px) {

    }
    @media (max-width: 849px) {

    }
    @media (max-width: 639px) {

    }
`;

const Logo = styled.div`
    /* width: 330px; */
    height: 100px;
    /* border: 1px solid red; */
    justify-content: center;
    justify-items: center;
    position: absolute;
    left: 340px;
    top: 20px;
    display: flex;  
    
    @media (max-width: 1899px) {
        position: absolute;
        left: 180px;
    }
    @media (max-width: 1599px) {
        height: 90px;
        position: absolute;
        left: 130px;
    }
    @media (max-width: 1399px) {
        height: 90px;
        position: absolute;
        left: 110px;
    }
    @media (max-width: 1299px) {
        height: 80px;
        position: absolute;
        left: 80px;
    }
    @media (max-width: 1199px) {
        height: 70px;
        position: absolute; /* 로고를 고정 위치로 설정 */
        left: 80px; /* 왼쪽에서 20px 떨어진 위치 */
    }

    @media (max-width: 849px) {
        height: 70px;
        position: absolute; /* 로고를 고정 위치로 설정 */
        left: 60px; /* 왼쪽에서 10px 떨어진 위치 */
    }

    @media (max-width: 639px) {
        height: 65px;
        position: absolute; /* 로고를 고정 위치로 설정 */
        left: 3px; /* 왼쪽에서 5px 떨어진 위치 */
        top: 10px;
        margin-left: 15px;
    }
`;

const Login = styled.div`
    width: 125px;
    height: 50px;
    align-items: center;
    justify-content: space-around;
    display: flex;
    padding: 0 20px 0 20px;
    margin: -10px 170px;
    position: absolute;
    right: 9%;
    top: 10%;

    P {
        margin: 0 5px;
        cursor: pointer;
        color: #404040;

        &:hover {
            color: #5AC463;
            text-decoration: underline;
        }
    }
    @media (max-width: 2099px) {
        margin: 10px 100px;
        position: relative;
        margin-top: -15px;
        left: 250px;
    }
    @media (max-width: 849px) {
        left: 240px;
        font-size: 15px;
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
        display: block;
        position: absolute;
        right: 3.5%;
        top: 7%;
        font-size: 25px;
        color: #404040;
        z-index: 999;
    }
`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <HeaderContainer>
                <Logo><img style={{ width: '100%', height: '100%' }} src={ logo } alt='Suhwagdam Logo'></img></Logo>
                <HamburgerBtn onClick={ toggleMenu }>
                    { isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
                </HamburgerBtn>
               
                <Login visible={ visible }>
                    <Link to='/login' style={{ textDecoration: 'none' }}><p>로그인</p></Link>
                    |
                    <Link to='/joun' style={{ textDecoration: 'none' }}><p>회원가입</p></Link>
                </Login>
            </HeaderContainer>
            <Sidebar isOpen={isOpen} />
        </>
    );
};

export default Header;