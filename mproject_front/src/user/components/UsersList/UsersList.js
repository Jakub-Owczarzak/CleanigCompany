import React from 'react';
import styled from 'styled-components';

import UserItem from '../UserItem/UserItem';

import { StyledUl } from '../../../shared/StyledComponents/StyledUl';

const UsersList = ({ items }) => {
  const noUsersDiv = <h2>No users found</h2>;
  return (
    <>
      {items.length === 0 ? (
        noUsersDiv
      ) : (
        <StyledUl>
          {items.map((user) => (
            <UserItem
              key={user.id}
              id={user._id}
              image={user.userImage}
              name={user.userName}
              placeCount={user.ownPlaces.length}
              color={user.color}
            />
          ))}
        </StyledUl>
      )}
    </>
  );
};

export default UsersList;
