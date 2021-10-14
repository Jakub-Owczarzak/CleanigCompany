import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import MainHeader from './MainHeader';
import BurgerButton from '../UIComponent/BurgerButton';
import NavLinkConteiner from './NavLinkConteiner';

const StyledH1 = styled.h1`
  margin: 0 20px 0 0;
  @media (min-width: 760px) {
    margin: 0 0px 0 20px;
  }
`;

const StyledLink = styled(Link)`
  color: White;
  text-decoration: none;
  margin: 1rem;
  position: relative;
  &:hover {
    color: green;
  }
`;

const MainNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMobileMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <MainHeader>
      <BurgerButton openMenuFnc={handleMobileMenu} />
      <StyledH1>
        <StyledLink to={`/`}>CLEAN COMPANY</StyledLink>
      </StyledH1>
      <NavLinkConteiner isOpen={menuOpen} menuClose={handleMobileMenu} />
    </MainHeader>
  );
};

export default MainNavigation;
