import styled from 'styled-components';

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  border: solid #888 2px;
  padding: 15px;
  max-width: 300px;
  width: 100%;
  color: black;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;
  margin: 20px;

  :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
`;
