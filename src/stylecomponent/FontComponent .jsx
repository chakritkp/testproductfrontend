import React from "react";
import styled from "styled-components";


const fontTypeMap = {
  default: {
    fontSize: '16px',
    fontWeight: '300',
    color: '#252525',
    textAlign: 'start'
  },
  pagetitle: {
    fontSize: '32px',
    fontWeight: '600',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '12px',
    fontWeight: '400',
    color: '#6C6C70',
  },
  price: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#E13B30',
  },
}


const StyledFontComponent = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: ${(props) => props.fontSize || fontTypeMap[props.fontType]?.fontSize || fontTypeMap.default.fontSize};
  color: ${(props) => props.color || fontTypeMap[props.fontType]?.color || fontTypeMap.default.color};
  font-weight: ${(props) => props.fontWeight || fontTypeMap[props.fontType]?.fontWeight || fontTypeMap.default.fontWeight};
  text-align: ${(props) => props.textAlign || fontTypeMap[props.fontType]?.textAlign || fontTypeMap.default.textAlign};
`;

const FontComponent = ({
  children,
  fontType,
  fontSize,
  fontWeight,
  color,
  textAlign,
  className,
}) => {
  return (
    <StyledFontComponent
      fontType={fontType}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      className={className}
    >
      {children}
    </StyledFontComponent>
  );
};

export default FontComponent;
