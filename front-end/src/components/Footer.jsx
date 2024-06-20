import React from 'react';
import styled from 'styled-components';

// 푸터 전체 컨테이너 스타일
const FooterContainer = styled.div`
  background-color: #f8f8f8;
  padding: 40px 0;
  text-align: center;
  color: #333;
  position: relative;
  height: 20vh;
  margin-top: 250px;
    

  @media (max-width : 639px){
    display : none; 
}
`;

// 정보 섹션 스타일
const InfoSection = styled.div`
  margin-bottom: 20px;
  line-height: 1.6;
`;

const InfoText = styled.p`
  margin: 0;
`;

// 링크 섹션 스타일
const LinksSection = styled.div`
  margin-bottom: 20px;
`;

const Link = styled.a`
  margin: 0 10px;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 저작권 섹션 스타일
const CopyrightSection = styled.div`
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <InfoSection>
        <InfoText>상호명 : (주)수확담 | 대표 : 김재철</InfoText>
        <InfoText>사업자등록번호 : 103-87-83592 | 통신판매업신고번호 : 제 2024-서울 강남-0620 호</InfoText>
        <InfoText>서울특별시 강남구 강남대로94길 20 삼오빌딩 5-9층 | 대표번호 : 070-2024-0620</InfoText>
        <InfoText>CS Center : 070-2024-0620 AM 9:00 - PM 06:00 (WEEKEND/HOLIDAY OFF)</InfoText>
      </InfoSection>
      <LinksSection>
        <Link href="#">회사소개</Link>
        <Link href="#">이용약관</Link>
        <Link href="#">개인정보처리방침</Link>
        <Link href="#">수확담정책</Link>
        <Link href="#">고객센터</Link>
      </LinksSection>
      <CopyrightSection>
        Copyright © kokj
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;

