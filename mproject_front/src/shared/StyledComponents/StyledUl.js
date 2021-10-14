import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style: none;
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

export { StyledUl };
