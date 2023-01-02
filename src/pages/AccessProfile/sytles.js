import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 64px;
  flex-direction: column;
  margin: 0px 100px;

  div.search {
    padding: 30px;
    width: 100vh;
  }
  div.userstyle {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const InputSearch = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  border: solid #888 2px;
  padding: 15px;
  max-width: 80vh;
  width: 100%;
  color: black;
  border-radius: 10px;
  font-size: 15px;
  box-sizing: border-box;
  :focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
`;
