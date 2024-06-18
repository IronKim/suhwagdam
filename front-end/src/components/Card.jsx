import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CardStyled = styled.div`
  /* border: 1px solid black; */
  width: 250px;
  height: 320px;
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
    width: 100%;
    height: 175px;
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
  padding-top: 10px;
  padding-bottom: 10px;
  @media (max-width: 639px;) {
    width: 150px;
    height: 150px;
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 18px;
  transition: transform 0.5s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    transform-origin: center center;
  }
  @media (max-width: 639px;) {
    padding: 10px 10px 10px 10px;
    flex:1;
  }
`;

const Contents = styled.div`
  /* border: 1px solid blue; */
  width: 240px;
  margin-left: 3px;
  height: 120px;
  @media (max-width: 639px) {

    height: 170px;
    flex-direction: column;
    align-items: center; 
  }
`;  

const Title = styled.div`
  /* border: 1px solid red; */
  margin: 10px auto;
  display: block;
  width: 90%;
  height: 40px;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  
  @media (max-width: 639px) {
    width: 100%;
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
  /* border: 1px solid orange;   */
  margin-top: 15px;
  color: red;
  font-weight: bold;
  @media (max-width: 639px) {
    width: 100%;
    color: red;
    height: 20px;
    font-weight: bold;
    font-size: 0.8;
  }
`;


const Price = styled.div`
  /* border: 1px solid pink; */
  margin-top: 10px;
  font-size: 1.1rem;
  color: #5AC463;
  width : 100%;
  height: 30px;

     @media (max-width: 639px) {
     width: 100%;
     display: flex;
     flex-direction: column;
     width: 100%;
     margin-top: 10px;
     height: 20px;
     font-size: 15px;
   }
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
    })

    return () => clearInterval(timer)

  },[ deadLine ])

  const formatCurrentBidPrice = (price) => {  
    return Number(price).toLocaleString()
  }

  return (
        <CardStyled> 
          <CardImageBox>
            <CardImage src={ image } alt='image' />
          </CardImageBox>
            
          <Contents>
            {/* <TitleTimeBox> */}
              <Title>{ title }</Title>
              <Time>{ timeLeft.hours }시간 { timeLeft.minutes }분 { timeLeft.seconds }초</Time>
            {/* </TitleTimeBox> */}

            {/* <PriceBox> */}
              <Price>{ formatCurrentBidPrice(current_bid_price) }원</Price>
            {/* </PriceBox> */}
          </Contents>

        </CardStyled>
  );
};

export default Card;