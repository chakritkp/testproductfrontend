import React from "react";
import styled from "styled-components";

const StyleButtonComponent = styled.button`
  font-family: "Prompt";
  font-size: 16px;
  font-weight: 400;
  width: 185px;
  height: 56px;
  border-radius: 24px;
  padding: 16px 72px;
  color: ${(props) => props.color || 'black'};
  background-color: ${(props) => props.bg || '#FFFFFF'};
  border: ${(props) => props.border || 'none'};
`;

const ButtonComponent = ({ color, border, bg, className, ...props }) => {
  return <StyleButtonComponent color={color} border={border} bg={bg} className={className} {...props} />;
};

export default ButtonComponent;
