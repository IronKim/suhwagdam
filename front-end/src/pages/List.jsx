import React, { useEffect, useRef, useState } from 'react';
import Card from '../components/Card';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { CiSearch } from 'react-icons/ci';
import { SlClose } from 'react-icons/sl';
import { LiaSlidersHSolid } from 'react-icons/lia';
import { Checkbox } from 'antd';
import { useRecoilValue } from 'recoil';
import { goodsState } from '../atoms/goodsState';
import { Link, useParams } from 'react-router-dom';
import ItemEmpty from "../components/ItemEmpty";

const Container = styled.div` 
    margin: 50px auto;
    flex-direction: column;
    width: 1200px;
    height: auto;
    
    @media (max-width: 1299px) {
        margin: 35px auto;
    }
    @media (max-width: 1199px) {
        margin: 30px auto;
        width: 100%;
   }
   @media (max-width: 639px) {
        margin: 0;
        margin-bottom: 100px;
        width: 100%;
        /* padding: 0 15px; */
   }
`;
const SearchContainer = styled.div`
    /* border: 1px solid blue; */
    position: relative;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    @media (max-width: 639px) {
        width: 90%;
        margin: 10px 0 20px 20px;
        margin-left: 20px;
    }
`;
const SearchInput = styled.input` 
    /* border: 1px solid black; */
    width: 450px;
    padding-right: 20px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 10px 20px;
    align-items: center;
    outline: none;

    &:hover {
    border: 1px solid #5AC463;
    }

    @media (max-width: 639px) {
        width: 300px;
    }
`;
const CloseIcon = styled.div`
    /* border: 1px solid black; */
    right: 45px;
    cursor: pointer;
    font-size: 20px;
    margin-left: -40px;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
    color: #5AC463;
  }
`;  
const SearchBtn = styled.button`
    cursor: pointer;
    border: 1px solid black;
    background-color: #5AC463;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    margin-left: 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`; 
const slideFadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
const TabBox = styled.div` 
    display: flex;  
    flex-direction: row;
    justify-content: space-between;
`;
const DropList = styled.div`
    /* border: 1px solid red; */
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding-left: 15px;
    width: 100%;

    @media (max-width: 639px) {
        margin: 0 auto;
        flex-direction: row;
        gap: 10px;
    }
`;
const ListTitle = styled.p`
    width: 150px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    @media (max-width: 639px) {
        justify-content: flex-start;
        width: 90px;
        height: 30px;
    }
`;
const DropDown = styled.div`
    border: 1px solid black;
    width: 140px;
    line-height: 40px;
    display: flex;
    left: 200px;
    border-radius: 15px;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    flex-direction: column;
    align-items: center;

    @media (max-width: 639px) {
        width: 130px;
        left: 150px;
        border-radius: 10px;
    }
 `;
const DropContents = styled.div`
    /* border: 1px solid blue; */
    width: 140px;
    height: 40px;
    line-height: 40px;
    display: flex;  
    flex-direction: column;
    align-items: center;
    font-size: 17px;
    background-color: white;
    z-index: 996;
    &:hover {
        background-color: #FFFAE3;
    }
    @media  (max-width: 639px) {
        width: 130px;
        height: 30px;
        font-size: 15px;
        line-height: 30px;
    }
`; 
const DropAbsolute = styled.div`
    position: absolute;
    border-radius: 15px;
    border:1px solid black;
    overflow: hidden;
    margin-top:-2px;
    z-index: 9999;
    @media  (max-width: 639px) {
        border-radius: 10px;
    }
`; 
const FilterIcon = styled.div`
    display: none;

    @media (max-width: 639px) {
        display: flex;
        margin-right: 10px;
        width: 40px;
        height: 30px;
        font-size: 30px;
        align-items: center;
        justify-content: center;
        right: 50px;
        top: 185px;
    }
`;
const WriteBtn = styled.button`
    margin-right: 20px;
    width: 120px;
    height: 40px;
    border-radius: 15px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 10px;
    border: 1px solid #5AC463;
    color: #5AC463;
    cursor: pointer;
    animation: ${slideFadeIn} 0.5s ease;
    
    &:hover {
        background-color: #5AC463;
        color: white;
        transition: text-decoration 0.8s ease;
    }
    @media (max-width: 1199px) {
        right: 5.4%;       
    }
    @media (max-width: 849px) {
        right: 5.4%;       
    }
    @media (max-width: 639px) {
        display: none;
    }
`;

const FilterContainer = styled.div`
    display: none;
    @media(max-width: 639px) {
        display: ${props => props.filterVis ? 'flex' : 'none'};
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        z-index: 996;
    }
`;

const FilterBox = styled.div`   
    background-color: white;
    display: flex;  
    width: 250px;
    height: 35px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    left: 30px;
    top: 265px;
    z-index: 999;

    @media (max-width: 1300px) {
        top: 245px;
        left: 10px;
    }
    @media (max-width: 639px) {
        position: relative;
        display: ${props => props.filterVis ? 'flex' : 'none'};
        width: 280px;
        height: 100px;
        border-radius: 8px;
        flex-direction: column; 
        padding: 20px;
        left: 0;
        top: 0;
        gap: 20px;
        background-color: white;
        z-index: 998;
    }
`;
const CheckDiv = styled.div`
    @media(max-width: 639px) {
        display: none;
    }
`;
const ButtonDiv = styled.div`
    display: none;
    @media (max-width: 639px) {
        display:flex;
        width: 280px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;
const FilterTitle = styled.p`
    display: none;
    @media (max-width: 639px) {
        display: flex;
        font-size: 20px;
        color: gray;
        padding-bottom: 10px;
    }
`;
const FilterButton = styled.button`
    display: none;
    @media(max-width: 639px) {
        border: 1px solid #B7B7B7;
        color: ${props => props.checked ? 'white' : '#B7B7B7'};
        background-color: ${props => props.checked ? '#B7B7B7' : 'white'};
        display: flex;
        border-radius: 8px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 40px;
        z-index: 998;
    }
`;
const FilterBack = styled.div`   
    display: none;
    @media (max-width: 639px) {
        display: ${props => props.filterVis ? 'flex' : 'none'};
        position: absolute;
        background-color: black;
        width: 100%;
        height: 100%;
        opacity: 0.45;
        top: 0;
        z-index: 997;
    }
`;
const FilterText = styled.p`
    margin-left: 2px;
    margin-right: 3px;
    font-size: 16px;
    cursor: pointer;
`;
const CardDiv = styled.div`
    /* border: 1px solid black; */
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 50px;
    gap: 20px;
    padding: 0 20px;

    @media (max-width: 1199px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 849px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 639px) {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        height: auto;
        margin-top: 20px;
        padding: 0;
    }
`;

const List = () => {
    const [now, setNow] = useState(new Date()); // 현재 시간 상태
    const data = useRecoilValue(goodsState); // Recoil 상태 관리 훅을 통해 데이터 상태를 가져옴

    const [dataList, setDataList] = useState([]); // 리스트에 보여질 데이터 상태
    const [itemsShow, setItemsShow] = useState(16); // 한 번에 보여줄 아이템 수 상태

    const { ref, inView } = useInView({ threshold: 0.5 }); // Infinite Scroll을 위한 useRef와 useInView hook
    const prevInView = useRef(false); // useRef를 사용하여 이전 inView 값을 기억
    
    const [drop, setDrop] = useState(false); // 드롭다운 상태를 관리하는 상태

    const [filterVis,setFilterVis] = useState(false)

    const { state } = useParams(); // URL의 state 값을 가져오기 위한 useParams hook
    const [selectedContent, setSelectedContent] = useState(state === 'ing' ? '마감시간 많은 순' : '마감시간 적은 순'); // 선택된 정렬 옵션을 관리하는 상태

    const [checkedFarm, setCheckedFarm] = useState(true); // 체크박스(농산물) 상태
    const [checkedSea, setCheckedSea] = useState(true); // 체크박스(수산물) 상태

    const [search, setSearch] = useState(''); // 검색어 상태
    const [checkedOneHour, setCheckedOneHour] = useState(true); // 체크박스(마감임박) 상태
    const [showOneHour, setShowOneHour] = useState(false); // 마감임박 버튼 상태


    useEffect(() => {
        // 데이터가 변경될 때마다 itemsShow 상태에 따라 dataList를 업데이트
        setDataList([...data].slice(0, itemsShow));
    }, [data, itemsShow]);

    useEffect(() => {
        // 0.5초마다 업데이트하는 interval 설정
        const intervalId = setInterval(() => {
            setNow(new Date());
        }, 500);
        
        // 컴포넌트 언마운트 시 interval 클리어
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // state 값이 변경될 때마다 sortAndFilterData 함수 호출
        sortAndFilterData();
    }, [state, data, itemsShow, checkedFarm, checkedSea, selectedContent, search, checkedOneHour, showOneHour]);

    useEffect(() => {
        // Infinite Scroll을 위해 inView 값이 변경될 때마다 itemsShow 상태 업데이트
        if (inView && !prevInView.current) {
            setItemsShow(prevItems => prevItems + 16);
        }
        prevInView.current = inView;
    }, [inView]);

    useEffect(() => {
        if (state === 'ing') { 
            setSelectedContent('마감시간 많은 순')
            setCheckedOneHour(false)
        }
    }, [state]);

    useEffect(()=> {
        if(filterVis) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }
    },[filterVis])

    const sortAndFilterData = () => {
        let filteredData = [...data];

        // 농산물, 수산물 체크박스에 따라 데이터 필터링
        filteredData = filteredData.filter(item => {
            if (checkedFarm && !checkedSea) {
                return item.category.id === 100;
            }
            if (!checkedFarm && checkedSea) {
                return item.category.id === 200;
            }
            return true;
        });

        // state에 따른 데이터 필터
        // if (state === 'ing') {
        //     filteredData = filteredData.filter(item => new Date(item.deadline) > new Date());
        // } else if (state === 'onehour') {
        //     filteredData = filteredData.filter(item => new Date(item.deadline) - new Date() < 3600000);
        // } else {
        //     filteredData = filteredData.filter(item => new Date(item.deadline) > new Date());
        // }
        if (showOneHour) {
            filteredData = filteredData.filter(item => new Date(item.deadline) - new Date() < 3600000);

        } else {
            filteredData = filteredData.filter(item => new Date(item.deadline) > new Date());
        }

        // 검색어 필터링
        if (search.trim() !== '') {
            filteredData = filteredData.filter(item => item.title.includes(search));
        }

        // deadline이 0이 아닌 데이터만 필터링
        filteredData = filteredData.filter(item => new Date(item.deadline) > new Date());

        // 선택된 content에 따라 데이터 정렬
        if (selectedContent === '높은 가격 순') {
            filteredData.sort((a, b) => b.currentBidPrice - a.currentBidPrice);
        } else if (selectedContent === '낮은 가격 순') {
            filteredData.sort((a, b) => a.currentBidPrice - b.currentBidPrice);
        } else if (selectedContent === '마감시간 많은 순') {
            filteredData.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
        } else if (selectedContent === '마감시간 적은 순') {
            filteredData.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (selectedContent === '최근 작성 순') {
            filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        // dataList 업데이트
        setDataList(filteredData.slice(0, itemsShow));
    };

    const DropDownToggle = () => {
        setDrop(!drop); // 드롭다운 상태 토글
    };

    const DropContentsClick = (selectedContent) => {
        setSelectedContent(selectedContent); // 드롭다운에서 선택된 내용으로 selectedContent 업데이트
        setDrop(false); // 드롭다운 닫기
        sortAndFilterData(); // 정렬 및 필터링 함수 호출
    };

    const CheckBoxChange = (categoryId, e) => {
        const { checked } = e.target;

        if (categoryId === 100) {
            setCheckedFarm(checked); // 농산물 체크박스 상태 업데이트

        } else if (categoryId === 200) {
            setCheckedSea(checked); // 수산물 체크박스 상태 업데이트
        }
    };
    const CheckOneHour = () => {
        setShowOneHour(!showOneHour); // 마감임박 버튼 상태 토글
    }

    return (
        <Container>
            <SearchContainer>
                <SearchInput type='text' placeholder='검색어를 입력해주세요.' value={search} onChange={(e) => setSearch(e.target.value)} />
                <CloseIcon onClick={() => setSearch('')}>
                    <SlClose />
                </CloseIcon>
                <SearchBtn onClick={sortAndFilterData}><CiSearch /></SearchBtn>
            </SearchContainer>

            <TabBox>
                <DropList>
                    <ListTitle>상품 목록</ListTitle>
                    <DropDown onClick={DropDownToggle}>
                        {drop ? (
                            <DropContents>
                                <DropAbsolute>
                                    <DropContents onClick={() => DropContentsClick('최근 작성 순')}>최근 작성 순</DropContents>
                                    <DropContents onClick={() => DropContentsClick('높은 가격 순')}>높은 가격 순</DropContents>
                                    <DropContents onClick={() => DropContentsClick('낮은 가격 순')}>낮은 가격 순</DropContents>
                                    <DropContents onClick={() => DropContentsClick('마감시간 많은 순')}>마감시간 많은 순</DropContents>
                                    <DropContents onClick={() => DropContentsClick('마감시간 적은 순')}>마감시간 적은 순</DropContents>
                                </DropAbsolute>
                            </DropContents>
                        ) : (
                            <DropContents onClick={DropDownToggle}>{selectedContent}</DropContents>
                        )}
                    </DropDown>
                </DropList>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <Link to='/goods-register' style={{textDecoration: 'none'}}>
                        <WriteBtn>상품 등록</WriteBtn>
                    </Link>
                            
                    <FilterContainer filterVis={filterVis}>     
                        <FilterBack filterVis={filterVis} onClick={() => setFilterVis(!filterVis)}/>   
                        <FilterBox filterVis={filterVis}>
                            <FilterTitle>필터를 선택해주세요.</FilterTitle>
                            <ButtonDiv>     
                                <FilterButton onClick={() => setShowOneHour(!showOneHour)} checked={showOneHour}>마감 임박</FilterButton>
                                <FilterButton onClick={() => setCheckedFarm(!checkedFarm)} checked={checkedFarm}>농산물</FilterButton>
                                <FilterButton onClick={() => setCheckedSea(!checkedSea)} checked={checkedSea}>수산물</FilterButton>
                            </ButtonDiv>
                            </FilterBox>
                    </FilterContainer>

                    <FilterBox>
                        <CheckDiv>
                            <Checkbox onClick={() => setCheckedFarm(!checkedFarm)} checked={checkedFarm}>
                                <FilterText>농산물</FilterText>
                            </Checkbox>
                            <Checkbox onClick={() => setCheckedSea(!checkedSea)} checked={checkedSea}>
                                <FilterText>수산물</FilterText>
                            </Checkbox>
                        </CheckDiv>
                    </FilterBox>
                    <FilterIcon onClick={() => setFilterVis(!filterVis)}><LiaSlidersHSolid /></FilterIcon>
                </div>
            </TabBox>
            
            <CardDiv>
                {
                    dataList.map((item, index) => (
                        <Card
                            key={index}
                            seq={item.seq}
                            title={item.title}
                            deadLine={item.deadline}
                            current_bid_price={item.currentBidPrice}
                            image={item.images[0]}
                        />
                ))}
            </CardDiv>
            <div ref={ref} /> {/* inView Scroll 생성 위치 */}
            {
                dataList.length === 0 && <ItemEmpty />

            }
        </Container>
    );
};

export default List;