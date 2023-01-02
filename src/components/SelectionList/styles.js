import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: center;
`;

export const LineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 95%;

  text {
    margin-right: 15px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  justify-content: space-between;
  filter: drop-shadow(3px 2px 0px #00000040);
  background-color: #d9d9d9;
  border: solid #9b8f8f 2px;
  padding: 8px;
  margin: 0px 10px 0px 0px;
  color: black;
  border-radius: 11px;
  font-size: 20px;
  word-wrap: break-all;

  div {
    width: 215px;
    text-overflow: ellipsis;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 30%;
  height: 130px;
  filter: drop-shadow(3px 2px 0px #00000040);
  background-color: #d9d9d9;
  border: solid #9b8f8f 2px;
  padding: 8px;
  margin: 0px 10px 0px 10px;
  color: black;
  border-radius: 11px;
  font-size: 20px;
  overflow-y: auto;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    background-color: white;
    border-radius: 10px;
    width: 10px;
    margin-right: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    box-shadow: inset 0 0 5px black;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  .removeBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: solid #9b8f8f 1px;
    width: 16px;
    height: 16px;
    color: red;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #d4423f;
      color: white;
    }
  }

  div {
    font-size: 16px;
    align-self: flex-start;
    margin: 5px 5px 2px 10px;
  }

  text {
    font-size: 18px;
    margin-top: 25px;
    align-self: center;
  }
`;
