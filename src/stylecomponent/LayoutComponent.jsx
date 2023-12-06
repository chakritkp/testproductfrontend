import React from 'react'
import styled from "styled-components";

const StyelLayoutComponent = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 0;
    margin: auto;
    max-width: 1240px;
`

const LayoutComponent = ({children}) => {

  return (
    <StyelLayoutComponent>
      {children}
    </StyelLayoutComponent>
  )
}

export default LayoutComponent
