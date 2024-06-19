import React, {useState} from 'react';
import styled from "styled-components";
import Mypage_info from '../Mypage_info';
import Mypage_address from '../Mypage_address';
import Mypage_bid from '../Mypage_bid';
import Mypage_auction from '../Mypage_auction';
import Mypage_Goods from '../Mypage_Goods';
import { TiThMenuOutline } from "react-icons/ti";

const MyPageInner = styled.div`
    /* border: 1px solid blue; */
    display: flex;
    max-width: 1200px;
    margin: auto;
    margin-top: 5%;
    @media (max-width: 749px){
        display: block;
    }
`
const ToggleDiv = styled.div`
    /* border: 1px solid red; */
    border-radius: 5px;
    width:200px;
    height: 200px;
    margin-top: 5%;
    font-weight: bold;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding-right: 0%;
    @media (max-width: 749px){
            display: ${({ show }) => (show ? 'block' : 'none')};
            width: 50%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: white;
        }
`
const Context = styled.div`
    /* border: 1px solid red; */
    width: 1000px;
    height: 800px;
    margin: auto;
    @media (max-width: 749px){
        width: 100%;
        }
`
const Info = styled.div`
    /* border: 1px solid #5AC463; */
    border-bottom: none;
    height: 40px;
    background-color: ${({ click }) => (click ? '#5AC463' : '#FFFEF')};
    display : flex;
    justify-content : center;
    align-items : center;
    &:hover {
    background-color: #FFFAE3;
    cursor: pointer;
    }
`
const Address = styled.div`
    /* border: 1px solid #5AC463; */
    border-bottom: none;
    height: 40px;
    background-color: ${({ click }) => (click ? '#5AC463' : '#FFFEF')};
    display : flex;
    justify-content : center;
    align-items : center;
    &:hover {
    background-color: #FFFAE3;
    cursor: pointer;
    }
`
const Goods = styled.div`
    /* border: 1px solid #5AC463; */
    border-bottom: none;
    height: 40px;
    background-color: ${({ click }) => (click ? '#5AC463' : '#FFFEF')};
    display : flex;
    justify-content : center;
    align-items : center;
    &:hover {
    background-color: #FFFAE3;
    cursor: pointer;
    }
`
const Auction = styled.div`
    /* border: 1px solid #5AC463; */
    border-bottom: none;
    height: 40px;
    background-color: ${({ click }) => (click ? '#5AC463' : '#FFFEF')};
    display : flex;
    justify-content : center;
    align-items : center;
    &:hover {
    background-color: #FFFAE3;
    cursor: pointer;
    }
`
const Bid = styled.div`
    /* border: 1px solid #5AC463; */
    /* border-bottom: none; */
    height: 40px;
    background-color: ${({ click }) => (click ? '#5AC463' : '#FFFEF')};
    display : flex;
    justify-content : center;
    align-items : center;
    &:hover {
    background-color: #FFFAE3;
    cursor: pointer;
    }
`
const HamburgerButton = styled.button`
    display: none;
    @media (max-width: 749px){
        border: none;
        display: flex;
        background: none;
        /* border: none; */
        font-size: 24px;
        cursor: pointer;
        margin: 10px;
        margin-top: 10%;
        align-items : center;
    }
`
const Menu = styled.div`
    
`
const MyPage = () => {
    const [infoClick, setInfoClick] = useState(true);
    const [addressClick, setAddressClick] = useState(false);
    const [goodsClick, setGoodsClick] = useState(false);
    const [auctionClick, setAuctionClick] = useState(false);
    const [bidClick, setBidClick] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const infoOn = () => {
        setInfoClick(true)
        setAddressClick(false)
        setGoodsClick(false)
        setAuctionClick(false)
        setBidClick(false)
    }
    const addressOn = () => {
        setAddressClick(true)
        setInfoClick(false)
        setGoodsClick(false)
        setAuctionClick(false)
        setBidClick(false)
    }
    const goodsOn = () => {
        setGoodsClick(true)
        setInfoClick(false)
        setAddressClick(false)
        setAuctionClick(false)
        setBidClick(false)
    }
    const auctionOn = () => {
        setAuctionClick(true)
        setInfoClick(false)
        setAddressClick(false)
        setBidClick(false)
        setGoodsClick(false)
    }
    const bidOn = () => {
        setBidClick(true)
        setInfoClick(false)
        setAddressClick(false)
        setAuctionClick(false)
        setGoodsClick(false)
    }
    const close = () => {
        setMenuOpen(false)
    }

    return (
        <div style={{width:'100%'}}>
        <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu>메뉴</Menu><TiThMenuOutline style={{color:'green'}} />
        </HamburgerButton>
        <MyPageInner onClick={close}>
            <Context>
                {infoClick && <Mypage_info/>}
                {addressClick && <Mypage_address/>}
                {goodsClick && <Mypage_Goods/>}
                {auctionClick && <Mypage_auction/>}
                {bidClick && <Mypage_bid/>}
            </Context>
            <ToggleDiv show={menuOpen}>
                <Info click={infoClick} onClick={infoOn}>정보 수정</Info>
                <Address click={addressClick} onClick={addressOn}>배송지 관리</Address>
                <Goods click={goodsClick} onClick={goodsOn}>상품 관리</Goods>
                <Auction click={auctionClick} onClick={auctionOn}>경매 내역</Auction>
                <Bid click={bidClick} onClick={bidOn}>낙찰 내역</Bid>
            </ToggleDiv>
        </MyPageInner>
        </div>
    );
};

export default MyPage;