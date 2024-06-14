import React from 'react';
import Card from '../components/Card';
import styled from 'styled-components';
import data from '../asset/data/data.js';

const Container = styled.div`
    margin: 120px auto;
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
        margin-left: 40px;
   }
`;

const CardDiv = styled.div`
    width: 100%;
    height: 700px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    
    @media (max-width: 1199px) {
        height: 820px;
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 849px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 639px) {
        width: 100%;
        height: auto;
        grid-template-columns: repeat(2, 1fr);
        justify-content: center;
    }
    @media (max-width: 599px) {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        height: auto;
    }
`;

const LinkText = styled.p`
    display: flex;
    margin: 7px 0 0 50px;
    color: #5AC463;
    font-size: 15px;

    &:hover {
        transition: text-decoration 0.5s ease;
        cursor: pointer;
        text-decoration: underline;
    }
`;

const Main = () => {
    const now = new Date()
    
    const filteredData = data.filter(item => {
        const deadLineData = new Date(item.deadLine)
        const countDown = (deadLineData - now) / (1000 * 60 * 60)
            return countDown <= 1 && deadLineData > now
    })  

    const sortedDataDesc = [...data].sort((a, b) => new Date(b.deadLine) - new Date(a.deadLine)).slice(0, 8)
    const sortedDataAsc = [...filteredData].sort((a, b) => new Date(a.deadLine) - new Date(b.deadLine)).slice(0, 8)

    return (
        <Container>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '8px', fontSize: '20px', fontWeight: 'bold' }}>진행 중인 상품</p>
                    <LinkText>보러가기</LinkText>
                </div>

                <CardDiv> 
                    {   
                        sortedDataDesc.map((item, index) => (
                            <Card key={ index } 
                                  title={ item.title } 
                                  deadLine={ item.deadLine }   
                                  current_bid_price={ item.current_bid_price } 
                                  image={ item.image } />
                        ))
                    }
                </CardDiv>

                <div style={{ display: 'flex', marginTop: '25px' }}>
                    <p style={{ margin: '8px 0 10px 10px', fontSize: '20px', fontWeight: 'bold' }}>마감 임박 상품</p>
                    <LinkText>보러가기</LinkText>
                </div>

                <CardDiv> 
                    {   
                        sortedDataAsc.map((item, index) => (
                            <Card key={ index } 
                                  title={ item.title } 
                                  deadLine={ item.deadLine }   
                                  current_bid_price={ item.current_bid_price } 
                                  image={ item.image } />
                        ))
                    }
                </CardDiv>
        </Container>
    );
};

export default Main;