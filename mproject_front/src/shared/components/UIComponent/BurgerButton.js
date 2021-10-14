import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  margin-left: 10px;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  @media (max-width: 760px) {
    display: flex;
  }
`;

const StyledSpanBar = styled.span`
  width: 90%;
  height: 5px;
  background-color: white;
  display: block;
  margin: 0 auto;
`;

const BurgerButton = ({ openMenuFnc }) => {
  return (
    <StyledButton onClick={openMenuFnc}>
      <StyledSpanBar />
      <StyledSpanBar />
      <StyledSpanBar />
    </StyledButton>
  );
};

export default BurgerButton;
