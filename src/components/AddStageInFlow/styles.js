import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;

  div.addStage {
    cursor: pointer;
  }

  button.add-button-flow {
    background-color: #44c767;
    border-radius: 28px;
    border: 1px solid #18ab29;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 16px 31px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #2f6627;
  }

  .add-button-flow:hover {
    background-color: #5cbf2a;
  }
  .add-button-flow:active {
    position: relative;
    top: 1px;
  }
`;
