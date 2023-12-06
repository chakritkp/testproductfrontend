import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FontComponent from "../stylecomponent/FontComponent ";

const CardContainer = styled.div`
  width: 200px;
  height: 335px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 10px 0px rgb(0 0 0 / 0.1);
`;
const ImageContainer = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 200px;
  height: 200px;
`;

const ImageSlider = styled.div`
  min-width: 100%;
  min-height: 100%;
  background-size: cover;
  transition: 500ms;
`;
const CurrentIndexContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 12px;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const CurrentIndex = styled.div`
  width: 16px;
  height: 2px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
`;


const ProductCard = ({ id, img, name, code, price }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => {
        const newIndex = prevIndex < img.length - 1 ? prevIndex + 1 : 0;
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlideIndex, img.length]);

  return (
    <CardContainer key={id}>
      <ImageContainer>
        {img.map((img, index) => (
          <ImageSlider
            key={index}
            style={{
              backgroundImage: `url(${img})`,
              transform: `translate(-${currentSlideIndex * 2}00px, 0)`,
            }}
          />
        ))}
        <CurrentIndexContainer>
          {img.map((img, index) => (
            <CurrentIndex
              key={index}
              style={{
                backgroundColor:
                  index === currentSlideIndex % img.length
                    ? "#E13B30"
                    : "#D9D9D9",
              }}
            />
          ))}
        </CurrentIndexContainer>
      </ImageContainer>

      <TextContainer>
        <div>
          <FontComponent fontType={'title'}>{name}</FontComponent>
          <FontComponent fontType={'subtitle'}>{code}</FontComponent>
        </div>
          <FontComponent fontType={'price'} textAlign={'end'}>฿{price}</FontComponent>
      </TextContainer>
    </CardContainer>
  );
};

export default ProductCard;
