import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Detail from "./pages/Detail";
import Goods from "./pages/Goods";
import {getGoodsList} from "./api/GoodsApiService";
import {useRecoilState} from "recoil";
import {goodsState} from "./atoms/goodsState";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from './pages/List';
import {subscribeToGoodsUpdates, subscribeToSuccessBid} from "./webSocket/Subscribe";
import {userState} from "./atoms/userState";
import {jwtDecode} from "jwt-decode";
import UserRoute from "./components/UserRoute";
import Confirm from "./pages/Confirm";
import MyPage from './pages/mypage/components/MyPage';
import PaymentForm from './pages/PaymentForm';
import sweet from 'sweetalert2'; 


const View = () => {
    const [goodsList, setGoodsList] = useRecoilState(goodsState);
    const [userData, setUserData] = useRecoilState(userState);
    const [notification, setNotification] = useState('');
    console.log(userData);

    const initGoodsList = () => {
        getGoodsList()
            .then(response => {
                setGoodsList(response.data.result);
            })
            .catch(error => {
                // console.error('Failed to fetch initial goods:', error);
            })
    }

    useEffect(() => {
        // 로그인 정보 조회
        const token = localStorage.getItem('suhwagdamToken') || sessionStorage.getItem('suhwagdamToken');
        token && setUserData(jwtDecode(token));

        // 초기 상품 목록 조회
        initGoodsList();
        // 상품 업데이트 구독
        const sub = subscribeToGoodsUpdates(setGoodsList);
        // 낙찰 알림 구독
        const subSuccessBid = subscribeToSuccessBid((data) => {
            sweet.fire({
                title: '낙찰 알림',
                text: `축하합니다! '${data.goodsTitle}' 상품의 낙찰에 성공하셨습니다.`,
                icon: 'success',
                confirmButtonText: '확인'
            });
        });
                
        return () => {
            sub.then(s => s.unsubscribe())
            .catch(e => {
                // console.error('에러',e);
               })
            subSuccessBid.then(s => s.unsubscribe())
            .catch(e => {
                console.error('낙찰실패:', e);
            });
        }
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path={'/'} element={<Main />} />
                    <Route path={'/list/:state'} element={<List />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/join'} element={<Join />} />
                    <Route path={'/mypage/:type'} element={<MyPage />} />
                    <Route path={'/goods-register'} element={<UserRoute> <Goods /> </UserRoute>} />
                    <Route path={'/goods/:goodsSeq'} element={<Detail />} />
                    <Route path={'/payment'} element={<PaymentForm />} />
                    <Route path={'/confirm'} element={<Confirm />} />
                </Routes>
                <Footer />
            </BrowserRouter>

            
        </div>
    );
};
export default View;