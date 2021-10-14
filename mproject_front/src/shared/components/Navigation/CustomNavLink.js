import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  height: 40px;
  display: block;
  text-decoration: none;
  font-size: 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: yellow;
    color: black;
    font-weight: bold;
  }
`;

const CustomNavLink = (props) => {
  return (
    <StyledLink to={props.path} exact={props.exact} onClick={props.clickFnc}>
      {props.text}
    </StyledLink>
  );
};

export default CustomNavLink;
