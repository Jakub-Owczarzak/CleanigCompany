import React from 'react';

import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100vw;
  height: 75px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: #ff0055;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainHeader = (props) => {
  return <StyledHeader>{props.children}</StyledHeader>;
};

export default MainHeader;
