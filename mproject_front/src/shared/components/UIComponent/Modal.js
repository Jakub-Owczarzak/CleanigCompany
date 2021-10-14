import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modalOpenHandler } from '../../Functions/modalFunction';
import { useHistory } from 'react-router-dom';

import * as actionCreator from '../../../redux/actions';

import styled from 'styled-components';

import Backdrop from './Backdrop';
import Card from './Card';
import CustomButton from '../FormElements/CustomButton';
import Map from './Map';

const StyledInfoDiv = styled.div`
  /* width: 100%; */
  height: 250px;
  background-color: aliceblue;
  margin: 20px 10px;
`;

const StyledContentDiv = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  z-index: 3200;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12201;
`;

const ModalOverlay = (props) => {
  const [deleteModalInfo, setDeleteModalInfo] = useState({
    message: 'Do you wannt to delete this record?',
    isDeleted: false,
  });

  const modalData = useSelector((state) => state.modalReducer.data);
  const { user, token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modalReducer.isOpen);

  const history = useHistory();

  let content = <div>Sorry error ha ocured</div>;

  useEffect(() => {
    setDeleteModalInfo({
      message: 'Do you wannt to delete this record?',
      isDeleted: false,
    });
  }, [modalStatus]);
  if (props.type === 'placeInfo') {
    content = (
      <StyledContentDiv
        // na element zajmujący 100% modala dajemy klika z event.stopPropagation()
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Card>
          <h1>{modalData.adress}</h1>
          <StyledInfoDiv>
            <Map zoom={16} center={modalData.coordinates} />
          </StyledInfoDiv>
          <CustomButton
            danger
            onClick={() =>
              modalOpenHandler(modalStatus, dispatch, actionCreator)
            }
          >
            CLOSE
          </CustomButton>
        </Card>
      </StyledContentDiv>
    );
  }
  if (props.type === 'deleteItem') {
    console.log('ADRES ZDJĘCIA W MODALU', modalData.imageUrl);
    const deleteItem = async () => {
      try {
        const deleteResponse = await fetch(
          `http://localhost:8080/places/delete/${modalData.itemID}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await deleteResponse.json();
        setDeleteModalInfo({
          message: 'Place has been deleted?',
          isDeleted: true,
        });
        dispatch(actionCreator.updatePlaces(modalData.itemID));

        history.push(`/${user.id}/places`);
      } catch (error) {
        console.log(error);
      }
    };
    content = (
      <StyledContentDiv
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Card>
          <h2>{deleteModalInfo.message} </h2>
          {!deleteModalInfo.isDeleted && (
            <CustomButton onClick={deleteItem}>Yes</CustomButton>
          )}
          <CustomButton
            onClick={() =>
              modalOpenHandler(modalStatus, dispatch, actionCreator)
            }
          >
            Back
          </CustomButton>
        </Card>
      </StyledContentDiv>
    );
  }
  if (props.type === 'info') {
    content = (
      <StyledContentDiv
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Card>
          <h2>{modalData.message}</h2>
          <CustomButton
            onClick={() =>
              modalOpenHandler(modalStatus, dispatch, actionCreator)
            }
          >
            Back
          </CustomButton>
        </Card>
      </StyledContentDiv>
    );
  }

  return <>{content}</>;
};

const Modal = (props) => {
  const modalType = useSelector((state) => state.modalReducer.modalType);

  return (
    <>
      <Backdrop modaltype={modalType}>
        <ModalOverlay type={modalType} />
      </Backdrop>
    </>
  );
};

export default Modal;
