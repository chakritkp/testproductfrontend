import React from 'react'
import styled from "styled-components";

const StyelLayoutComponent = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    max-width: 1240px;
    height: 100vh;
`

const LayoutComponent = ({children}) => {

  return (
    <StyelLayoutComponent>
      {children}
    </StyelLayoutComponent>
  )
}

export default LayoutComponent
