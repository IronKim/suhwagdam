import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { goodsState } from '../atoms/goodsState';
import { useNavigate } from 'react-router-dom';
import { calculateTimeDifference } from '../hook/time';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const OutLine = styled.div`
    width: 190px;
    height: 200px;
    margin: 20px;
    border-radius: 18px;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ReTitle = styled.div`
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 40px;
`;

const ReImg = styled.div`
    height: 90px;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const ReContent = styled.div`
    height: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 70px;
`;

const RelatedGoods = ({ currentGoodsSeq }) => {
    const dataList = useRecoilValue(goodsState);
    const [filterData, setFilterData] = useState([]);
    const [randomItems, setRandomItems] = useState([]);
    
    
    useEffect(() => {
        const handleResize = () => {
            let count;
            if (window.innerWidth <= 480) {
                count = 1;
            } else if (window.innerWidth <= 768) {
                count = 2;
            } else if (window.innerWidth <= 960) {
                count = 3;
            } else if (window.innerWidth <= 1190) {
                count = 4;
            } else {
                count = 5;
            }
    
            // 전체 상품에서 필터링 및 랜덤 선택
            const filteredList = dataList.filter(item => {
                const deadlineDate = new Date(item.deadline);
                const timeDiff = calculateTimeDifference(deadlineDate);
                return timeDiff.hours >= 0 && item.seq !== currentGoodsSeq;
            });
            
            const items = getRandomItems(filteredList, count);
            setRandomItems(items);
            setFilterData(filteredList);
        }
    
        const getRandomItems = (list, count) => {
            const items = [];
            const usedIndices = new Set();
    
            if (list.length <= count) {
                return list;
            }
            while (items.length < count && usedIndices.size < list.length) {
                const randomIndex = Math.floor(Math.random() * list.length);
    
                if (!usedIndices.has(randomIndex)) {
                    usedIndices.add(randomIndex);
                    items.push(list[randomIndex]);
                }
            }
    
            return items;
        }
    
        handleResize();
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dataList, currentGoodsSeq]);
    
    

    const navigate = useNavigate();
    const navigateDetail = (seq) => {
        navigate(`/goods/${seq}`);
    };

    return (
        <Container>
            {randomItems.map((item, index) => (
                <OutLine key={index} onClick={() => navigateDetail(item.seq)}>
                    <ReTitle>{item.title}</ReTitle>
                    <ReImg>
                        <img src={item.images[0]} alt={item.title} />
                    </ReImg>
                    <ReContent>{item.description}</ReContent>
                </OutLine>
            ))}
        </Container>
    );
};

export default RelatedGoods;
