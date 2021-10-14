import styled from 'styled-components';

const StyledMainView = styled.div`
  width: 100vw;
  min-height: calc(100vh - 75px);
  background-color: #454545;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 75px;
`;

const MainView = ({ children }) => {
  return <StyledMainView>{children}</StyledMainView>;
};

export default MainView;
