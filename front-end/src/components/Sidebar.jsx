import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SideContainer = styled.div` // 사이드바 전체 컨테이너 스타일
    display: none;

    @media (max-width: 639px) {
        border: 1px solid #D9D9D9;
        width: 100%;
        height: 170px;
        position: fixed;
        display: block;
        top: 0;
        right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
        font-size: 30px;
        background-color: white;
        z-index: 997;
        transition: right 0.9s ease-in-out;
    }
`;

const NonMemberContainer = styled.div`
    /* border: 1px solid blue; */
    width: 100%;
    height: 40px;
    display: flex;
    margin-top: 53px;
    flex-direction: row;
    justify-content: space-around;
    font-size: 15px;
    background-color: white;
`;

const NonMember = styled.div`
    /* border: 1px solid blue; */
    width: 230px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    margin-left: 30px;
    background-color: white;
`;

const JoinDiv = styled.div`
    width: 130px;
    height: 40px;
    display: flex;
    margin-right: 30px;
    color: gray;
    text-decoration: underline;
    justify-content: center;
    align-items: center;
    font-size: 25px;
`;

const LoginOutBtn = styled.button`
    border: 1px solid #5AC463;
    width: 300px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    border-radius: 12px;
    font-size: 15px;
    outline: none;
    color: white;
    background-color: #5AC463;
`;

const MypageContainer = styled.div`
    /* border: 1px solid blue; */
    width: 100%;
    position: absolute;
    top: 170px;
    /* height: 400px; */
    height: 650px;
    background-color: white;
`;

const MypageMenu = styled.div`
    border: 1px solid #D9D9D9;
    width: 100%;
    height: 78px;
    display: flex;
    font-size: 25px;
    align-items: center;
    justify-content: center;
    color: #404040;
    background-color: white;
`;

const Sidebar = ({ isOpen }) => {
 
    return (
        <SideContainer isOpen={ isOpen }>
            <NonMemberContainer>
                <NonMember>비비 님</NonMember>
                <JoinDiv><Link to = '/join' style={{ textDecoration: 'none', color: 'gray' }}>회원가입</Link></JoinDiv>
            </NonMemberContainer>
                <LoginOutBtn>
                    <Link to = '/login' style={{ textDecoration: 'none', color: 'white' }}>로그인</Link>
                </LoginOutBtn> 
            <MypageContainer>
                <MypageMenu><p>정보 수정</p></MypageMenu>
                <MypageMenu><p>배송지 관리</p></MypageMenu>
                <MypageMenu><p>상품 관리</p></MypageMenu>
                <MypageMenu><p>경매 내역</p></MypageMenu>
                <MypageMenu><p>낙찰 내역</p></MypageMenu>
            </MypageContainer>
        </SideContainer>

    );
};

export default Sidebar;