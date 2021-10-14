import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalOpenHandler } from '../../Functions/modalFunction';
import * as actionCretor from '../../../redux/actions';

import styled from 'styled-components';

const StyledBackdropDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.active ? `flex` : 'none')};
  z-index: 100;
`;

const Backdrop = (props) => {
  const modalStatus = useSelector((state) => state.modalReducer.isOpen);
  const dispatch = useDispatch();

  return (
    <StyledBackdropDiv
      active={modalStatus}
      //Warunkowe nadawanie akcji !!!!!!
      // {...(props.modalType === 'card' && {
      //   onClick: () => modalOpenHandler(modalStatus, dispatch, actionCretor),
      // })}

      //Event zamykaący modal
      onClick={() => modalOpenHandler(modalStatus, dispatch, actionCretor)}
    >
      {props.children}
    </StyledBackdropDiv>
  );
};

export default Backdrop;
