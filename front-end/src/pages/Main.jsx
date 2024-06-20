import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {goodsState} from '../atoms/goodsState';

const Container = styled.div`
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    width: 1200px;
    height: 1500px;

    @media (max-width: 1199px) {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 639px) {
        width: 80%;
        height: 80%;
    }
`;

const CardDiv = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;

    @media (max-width: 1199px) {
        height: 820px;
        grid-template-columns: repeat(3, 1fr);
        height: auto;
    }
    @media (max-width: 849px) {
        grid-template-columns: repeat(2, 1fr);
        height: auto;
    }
    @media (max-width: 639px) {
        width: 100%;
        height: auto;
        grid-template-columns: repeat(1, 1fr);
        justify-content: center;
    }
    @media (max-width: 599px) {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        height: auto;
    }
`;

const SectionP = styled.div`
    display: flex;
    margin: 40px 0 15px 20px;
    font-size: 25px;
    font-weight: bold;

    @media (max-width: 1199px) {
        margin-left: 30px;
    }
    @media (max-width: 849px) {
        margin-left: 50px;
    }
    @media (max-width: 639px) {
        margin-left: 10px;
    }
`;

const LinkText = styled.p`
    display: flex;
    margin: 45px 0 10px 20px;
    color: #5AC463;
    font-size: 15px;

    &:hover {
        transition: text-decoration 0.5s ease;
        cursor: pointer;
        text-decoration: underline;
    }
`;

const Main = () => {
    const [now, setNow] = useState(new Date());
    const data = useRecoilValue(goodsState);

    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        setDataList([...data]);
    }, [data]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 500); // 0.5초마다 현재 시간 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);

    return (
        <Container>
            <div style={{ display: 'flex' }}>
                <SectionP>진행 중인 상품</SectionP>
                <Link to='/list/ing' style={{textDecoration: 'none'}}>
                    <LinkText>보러가기</LinkText>
                </Link>
            </div>

            <CardDiv>
                {dataList && dataList
                    .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
                    .slice(0, 8)
                    .map((item, index) => (
                    <Card key={index}
                          title={item.title}
                          deadLine={item.deadline}
                          current_bid_price={item.currentBidPrice}
                          image={item.images[0]} />
                ))}
            </CardDiv>

            <div style={{ display: 'flex' }}>
                <SectionP>마감 임박 상품</SectionP>
                <Link to='/list/oneHour' style={{textDecoration: 'none'}}>
                    <LinkText>보러가기</LinkText>
                </Link>
            </div>
            <CardDiv>
                {dataList && dataList
                    //마감시간이 1시간 이내이고 마감시간이 안 지난 상품만 필터링
                    .filter(item => new Date(item.deadline) - now <= 3600000 && new Date(item.deadline) - now > 0)
                    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                    .map((item, index) => (
                    <Card key={index}
                          title={item.title}
                          deadLine={item.deadline}
                          current_bid_price={item.currentBidPrice}
                          image={item.images[0]} />
                ))}
            </CardDiv>
        </Container>
    );
};

export default Main;
