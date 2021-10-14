import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar from '../../../shared/components/UIComponent/Avatar';

const StyledLi = styled.li`
  background-color: black;
  width: 40%;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 5px;
  color: black;
  @media (max-width: 1024px) {
    width: 90%;
  }
  &:hover {
    background-color: yellow;
    color: black;
  }
  &:hover .info h2 {
    color: black;
  }
`;
const StyledContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const StyledUserInfo = styled.div`
  width: 25%;
  margin-right: 20px;
  & h2 {
    color: yellow;
  }
  & h3 {
    color: white;
  }
`;
const UserItem = (props) => {
  console.log(props.image);
  return (
    <>
      <StyledLi>
        <Link
          to={`/${props.id}/places`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <StyledContentDiv>
            <Avatar image={`http://localhost:8080/${props.image}`} userAvatar />
            <StyledUserInfo className="info">
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
              </h3>
            </StyledUserInfo>
          </StyledContentDiv>
        </Link>
      </StyledLi>
    </>
  );
};

export default UserItem;
