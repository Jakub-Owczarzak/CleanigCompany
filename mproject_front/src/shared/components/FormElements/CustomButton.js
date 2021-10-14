import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

const StyledCustomButton = styled.button`
  width: 75px;
  height: 40px;
  padding: 0.5rem 1rem;
  display: flex;
  margin-top: 1rem;
  text-decoration: none;
  border: 1px solid #ff0055;
  border-radius: 4px;
  background-color: #ff0055;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  &:hover {
    background: green;
  }
  ${(props) =>
    props.inverse &&
    css`
      &:hover {
        background-color: transparent;
        color: #ff0055;
      }
    `}

  ${(props) =>
    props.danger &&
    css`
      background: #830000;
      border-color: #830000;

      &:hover,
      :active {
        background: #f34343;
        border-color: #f34343;
      }
    `}
    ${(props) =>
    props.disabledBtn &&
    css`
      background-color: grey;

      &:hover {
        background-color: grey;
      }
    `}
    @media (min-width:1024px) {
    width: 100px;
    height: 40px;
  }
`;

const CustomButton = (props) => {
  if (props.href) {
    return (
      <StyledCustomButton
        inverse={props.inverse}
        as={'a'}
        href={props.href}
        danger={props.danger}
      >
        {props.children}
      </StyledCustomButton>
    );
  }

  if (props.to) {
    return (
      <StyledCustomButton
        as={Link}
        to={props.to}
        inverse={props.inverse}
        danger={props.danger}
      >
        {props.children}
      </StyledCustomButton>
    );
  }
  return (
    <>
      <StyledCustomButton
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
        inverse={props.inverse}
        danger={props.danger}
        disabledBtn={props.disabled ? props.disabled : false}
      >
        {props.children}
      </StyledCustomButton>
    </>
  );
};

export default CustomButton;
