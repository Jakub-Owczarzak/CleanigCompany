import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import Avatar from '../../shared/components/UIComponent/Avatar';
import Card from '../../shared/components/UIComponent/Card';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import * as actionCreator from '../../redux/actions';
import { modalOpenHandler } from '../../shared/Functions/modalFunction';
const StyledLi = styled.li`
  margin-bottom: 20px;
`;

const StyledContentDiv = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  & .image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    & .finished {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 0, 0, 0.3);
      h1 {
        font-size: 22px;
        color: ${(props) => props.istaskfinished && 'green'};
      }
    }
  }

  & .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 25%;
  }
  & .btn {
    border-top: 1px solid grey;

    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 25%;

    /* & button {
      width: 100px;
      height: 25px;
      border: none;
      color: wheat;
      background: grey;
      border-radius: 5px;
      &:hover {
        background-color: green;
        color: white;
      }
    } */
  }
  @media (min-width: 1024px) {
    width: 500px;
    height: 450px;
  }
`;

const PlaceItem = (props) => {
  console.log(props.image);
  const modalState = useSelector((state) => state.modalReducer.isOpen);
  const dispatch = useDispatch();
  console.log(props.id);

  const modalPlaceInfo = {
    adress: props.address,
    coordinates: props.coordinates,
  };

  // const deletePlace = (id) => {
  //   console.log(id);
  // };

  const modalDeleteInfo = {
    itemID: props.id,
    imageUrl: props.image,
    info: 'Do you want to delete this place',
  };

  return (
    <StyledLi>
      <Card>
        <StyledContentDiv istaskfinished={props.istaskfinished & true}>
          <div className={'image'}>
            <Avatar
              image={`http://localhost:8080/${props.image}`}
              placeAvatar
            />
            {props.istaskfinished && (
              <div className={'finished'}>
                <h1 istaskfinished={props.istaskfinished & true}>
                  Sprzątanie zakończone !
                </h1>
              </div>
            )}
          </div>
          <div className={'info'}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={'btn'}>
            <CustomButton
              inverse
              // href={'https://www.youtube.com/watch?v=AkMZ6fV3T_0'}
              onClick={() =>
                modalOpenHandler(
                  modalState,
                  dispatch,
                  actionCreator,
                  'placeInfo',
                  modalPlaceInfo
                )
              }
            >
              VIEW ON MAP
            </CustomButton>
            {!props.istaskfinished && (
              <CustomButton to={`/places/${props.id}`}>EDIT</CustomButton>
            )}
            <CustomButton
              onClick={() =>
                modalOpenHandler(
                  modalState,
                  dispatch,
                  actionCreator,
                  'deleteItem',
                  modalDeleteInfo
                )
              }
              danger
            >
              DELETE
            </CustomButton>
          </div>
        </StyledContentDiv>
      </Card>
    </StyledLi>
  );
};

export default PlaceItem;
