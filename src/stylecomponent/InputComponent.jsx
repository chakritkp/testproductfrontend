import React from "react";
import styled from "styled-components";

const StyleInputComponent = styled.input`
  font-family: "Poppins" , sans-serif;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  height: 56px;
  color: #252525;
  border-radius: 24px;
  border: 1px solid #d9d9d9;
  padding: 24px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  
  &::placeholder {
    color: #d9d9d9;
  }
`;

const InputComponent = ({ className, ...props }) => {
  return <StyleInputComponent className={className} {...props} />;
};

export default InputComponent;
