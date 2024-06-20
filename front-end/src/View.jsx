import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Detail from "./pages/Detail";
import Goods from "./pages/Goods";
import {getGoodsList} from "./api/GoodsApiService";
import {useRecoilState} from "recoil";
import {goodsState} from "./atoms/goodsState";
import Main from "./pages/Main";
import {connectWebSocket} from "./webSocket/WebSocketClient";
import {subscribeToGoodsUpdates} from "./webSocket/Subscribe";
import Header from "./components/Header";

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
        // 초기 상품 목록 조회
        initGoodsList();
        // 웹소켓 연결 설정
        connectWebSocket();

        subscribeToGoodsUpdates(setGoodsList);
    }, []);


    return (
        <div>
            <BrowserRouter>
                <Header />
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