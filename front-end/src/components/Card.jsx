import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardStyled = styled.div`
  /* border: 1px solid black; */
  width: 250px;
  height: 300px;
  margin: auto;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  justify-content: center;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 639px) {
    width: 350px;
    height: 172px;
    display: flex;
    margin: 0 auto;
  }
`;

const CardImageBox = styled.div`
  width: 250px;
  height: 170px;  
  overflow: hidden;
  position: relative;
  border-radius: 18px;
  @media (max-width: 639px;) {
    width: 230px;
    height: 200px;  
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: 90%;
  margin-top: 10px;
  /* object-fit: cover; */
  border-radius: 18px;
  transition: transform 0.5s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transform-origin: center center;
  }
  @media (max-width: 639px;) {
    width: 300px;
    height: 200px;
    padding: 10px 10px 10px 10px;
  }
`;

const Contents = styled.div`
  border: 1px solid blue;
  width: 240px;
  margin-left: 3px;
  height: 120px;

  @media (max-width: 639px) {
    width: 200px;
    height: 170px;
    flex-direction: column;
    gap: 50%;
    align-items: center; 
  }
`;  

const TitleTimeBox = styled.div`
  /* border: 1px solid green; */
  display: block;
  /* justify-content: space-between; */
  white-space: nowrap;
  font-size: 1.1rem;
  width: 240px;

  @media (max-width: 639px) {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100px;
  }
`;

const Title = styled.div`
  /* border: 1px solid red; */
  margin: 10px auto;
  display: block;
  width: 90%;
  height: auto;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 639px) {
    width: 180px;
    height: 80px;
    margin: 15px auto;
    white-space: wrap;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  }
`;

const Time = styled.div`
  border: 1px solid orange;  
  color: red;
  font-weight: bold;
  @media (max-width: 639px) {
    display: block;
    color: red;
    height: 50px;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
const PriceBox = styled.div`
  border: 1px solid green;
  display: block;
  /* justify-content: space-between; */
  white-space: nowrap;
  font-size: 1.2rem;
  width: 240px;
  height: 30px;
  margin-top: 5px;

  @media (max-width: 639px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
    height: 30px;

  }
`;
const Price = styled.div`
  border: 1px solid pink;
  font-size: 1.1rem;
  color: #5AC463;
  width : 100%;
  height: 30px;
`;
////////////////////////////////////////////////////////////////////

const formatNumber = (number) => {
  return number < 10 ?  number : String(number)
} 

const calculateTime = (deadLine) => {
  const now = new Date()
  const deadLineDate = new Date(deadLine)
  const countDown = deadLineDate - now

  if(countDown > 0) {
    const hours = Math.floor(countDown / (1000 * 60 * 60)),
    minutes = Math.floor((countDown / (1000 * 60)) % 60),
    seconds = Math.floor((countDown / 1000) % 60)

      return {
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds)
    } 
  } else {
      return {
        hour : '00', minutes : '00', seconds : '00'
      }
  }
}

const Card = ({ title, deadLine, current_bid_price, image }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTime(deadLine))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime(deadLine))
    }, 1000)

    return () => clearInterval(timer)

  },[ deadLine ])

  const formatCurrentBidPrice = (price) => {  
    return Number(price).toLocaleString()
  }

  return (
      <div style={{margin: '0 auto' }}>
          <CardStyled> 
            <CardImageBox>
              <CardImage src={ image } alt='image' />
            </CardImageBox>
              
            <Contents>
              <TitleTimeBox>
                <Title>{ title }</Title>
                <Time>{ timeLeft.hours }시간 { timeLeft.minutes }분 { timeLeft.seconds }초</Time>
              </TitleTimeBox>

              <PriceBox>
                <Price>{ formatCurrentBidPrice(current_bid_price) }원</Price>
              </PriceBox>
            </Contents>

          </CardStyled>
      </div>
  );
};

export default Card;