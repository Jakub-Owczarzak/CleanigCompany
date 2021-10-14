import React from 'react';

import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  margin: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 200px;
  min-width: 250px;
`;

const Card = (props) => {
  return (
    <StyledCard className={`card ${props.className}`}>
      {props.children}
    </StyledCard>
  );
};

export default Card;
