import React, {useEffect, useState} from 'react';
import AuctionForm from "./pages/AuctionForm";
import AuctionList from "./pages/AuctionList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Detail from "./pages/Detail";
import Goods from "./pages/Goods";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {getGoodsList} from "./api/GoodsApiService";
import axios from "axios";
import {useRecoilState} from "recoil";
import {goodsState} from "./atoms/goodsState";
import Main from "./pages/Main";

const View = () => {

    const [goodsList, setGoodsList] = useRecoilState(goodsState);

    const initGoodsList = () => {
        getGoodsList()
            .then(response => {
                setGoodsList(response.data.result);
            })
            .catch(error => {
                console.error('Failed to fetch initial goods:', error);
            })
    }

    useEffect(() => {
        // 초기 상품 리스트 가져오기
        initGoodsList();

        // 웹소켓 연결 설정
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            // 상품 등록,수정 이벤트 수신
            stompClient.subscribe('/topic/goods', (message) => {
                const newGoods = JSON.parse(message.body);
                console.log(newGoods)
                setGoodsList(prevGoodsList => {
                    const index = prevGoodsList.findIndex(goods => goods.id === newGoods.id);
                    if (index >= 0) {
                        // 상품 수정 시 업데이트
                        const updatedGoodsList = [...prevGoodsList];
                        updatedGoodsList[index] = newGoods;
                        return updatedGoodsList;
                    } else {
                        // 새로운 상품 추가
                        return [...prevGoodsList, newGoods];
                    }
                });
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);


    return (
        <div>
            {/*<AuctionList />*/}
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Main />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/join'} element={<Join />} />
                    <Route path={'/goods-register'} element={<Goods />} />
                    <Route path={'/goods/:goodsSeq'} element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default View;