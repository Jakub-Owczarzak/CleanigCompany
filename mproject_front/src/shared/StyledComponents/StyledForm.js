import styled, { css } from 'styled-components';
const StyledForm = styled.form`
  min-width: 90%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  & label {
    font-size: 2rem;
    margin-bottom: 5px;
  }
  /* & input,
  textarea {
    background-color: grey;
    width: 80%;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 5px;

    ${(props) =>
    props.danger &&
    css`
      background-color: red;
      width: 10000px;
    `}
  }
  & input {
    height: 2.5rem;
  }
  & textarea {
    height: 250px;
  } */
  @media (min-width: 1024px) {
    min-width: 30%;
  }
`;

const StyledInput = styled.input`
  /* background-color: grey; */
  width: 80%;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
  padding: 5px;
  height: 2.5rem;
  ${(props) =>
    props.danger &&
    css`
      background-color: rgba(255, 0, 0, 0.1);
    `}
`;
const StyledTextArea = styled(StyledInput)`
  height: 250px;
`;

const StyledErrorDiv = styled.div`
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
`;

export { StyledForm, StyledInput, StyledTextArea, StyledErrorDiv };
