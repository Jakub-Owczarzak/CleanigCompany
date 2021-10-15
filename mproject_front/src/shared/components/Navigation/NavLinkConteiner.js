import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled, { css, keyframes } from 'styled-components';
import CustomNavLink from './CustomNavLink';

import * as actionCreator from '../../../redux/actions';
import { Switch } from 'react-router';
import { modalOpenHandler } from '../../Functions/modalFunction';

const StyledNavContainer = styled.ul`
  display: flex;
  width: 60%;
  list-style-type: none;
  justify-content: center;
  align-items: center;

  @media (max-width: 760px) {
    width: 100%;
    display: block;
    position: absolute;
    top: -150px;
    left: 0px;
    list-style-type: none;
    background: #ff0055;
    transition: 1s;

    &.isOpen {
      top: 75px;
    }

    &.isClosed {
      top: -150px;
    }
    /* ${(props) =>
      props.isOpen &&
      css`
        display: block;
        position: absolute;
        top: -150px;
        left: 0px;
        animation: ${menuAnimationOpen} 0.3s linear forwards;
      `}

    ${(props) =>
      props.isClosed &&
      css`
        animation: ${menumenuAnimationClosed} 0.3s linear forwards;
      `} */
  }
`;
// creating keyframes

const menuAnimationOpen = keyframes`
from {
    top:-150px;
}
to {
top:70px
}
`;

const menumenuAnimationClosed = keyframes`
from {
    top:70px;
}
to {
    top:-150px;
}
`;

const StyledLi = styled.li`
  width: 25%;
  @media (max-width: 760px) {
    width: 100%;
  }
`;

const NavLinkConteiner = ({ isOpen, menuClose }) => {
  const { isAuthenicate, user } = useSelector((state) => state.authReducer);
  const modalState = useSelector((state) => state.modalReducer.isOpen);
  const dispatch = useDispatch();

  const logOuthandler = () => {
    console.log('logout!!!!!!!!');
    dispatch(actionCreator.logout());
    localStorage.removeItem('userData'); // usuwanie rekordu z local storage
    modalOpenHandler(
      modalState,
      dispatch,
      actionCreator,
      'info',
      'Użytkownik wylogowany'
    );
  };

  return (
    <StyledNavContainer
      isOpen={isOpen}
      isClosed={!isOpen}
      className={isOpen ? 'isOpen' : 'isClosed'}
      onClick={menuClose}
    >
      {isAuthenicate && user.userType === 'user' && (
        <>
          <StyledLi>
            <CustomNavLink path={'/userPlace/new'} text={'Add Place'} />
          </StyledLi>
          <StyledLi>
            <CustomNavLink path={`/${user.id}/places`} text={'My Place'} />
          </StyledLi>
        </>
      )}
      {isAuthenicate && user.userType === 'admin' && (
        <>
          <StyledLi>
            <CustomNavLink path={'/allUsers'} text={'All Users'} />
          </StyledLi>
        </>
      )}
      <StyledLi>
        {!isAuthenicate ? (
          <CustomNavLink path={'/auth'} text={'Authenticate'} />
        ) : (
          <CustomNavLink
            path={'/authForm'}
            text={'LogOut'}
            clickFnc={logOuthandler}
          />
        )}
      </StyledLi>
    </StyledNavContainer>
  );
};

export default NavLinkConteiner;
