import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const SliderDivMain = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 700px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
      width: 100%;
      height:100%;
  }
  
  .slick-slider{  
  /* border: 1px solid purple; */
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  /* @media (max-width: 700px) {
      width: 100%;
      height:100%;
  } */
}
.slick-list {
  /* border: 1px solid red; */
    width: 100%;
    height: 100%;
  }

  .slick-track {
    /* border: 1px solid purple; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
.slick-slide{
  /* border: 1px solid purple; */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  div {
    /* border: 1px dotted blue; */
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img{
    /* border: 1px dotted blue; */
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
`;

const Carousel = ({ images }) => {
  const settings = {
    // dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  };

  return (
    <SliderDivMain >
    <Slider {...settings}>
    {Array.isArray(images) && images.map((img, index) => (
          <div key={index}>
            <img src={img}/>
          </div>
        ))}
      
    </Slider>
  </SliderDivMain>
  );
}

export default Carousel;
