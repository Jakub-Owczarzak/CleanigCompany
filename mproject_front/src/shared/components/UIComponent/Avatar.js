import React from 'react';
import styled from 'styled-components';

const StyledUserImageBCG = styled.div`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : 'asdasd'};
  background-repeat: no-repeat;
  background-size: 150px 150px, cover;
  border-radius: 50%;
`;

const StyledPlaceImageSRC = styled.img`
  display: block;
  width: 100%;
  height: 300px;
  object-fit: fill;
`;
// const StyledImage = styled.img`
//   width: 100%;
//   height: 100%;
//   display: block;
//   border-radius: 50%;
// `;

const Avatar = (props) => {
  return (
    <>
      {props.userAvatar && (
        <StyledUserImageBCG image={props.image ? props.image : false} />
      )}
      {props.placeAvatar && <StyledPlaceImageSRC src={props.image} />}
    </>
  );
};

export default Avatar;
