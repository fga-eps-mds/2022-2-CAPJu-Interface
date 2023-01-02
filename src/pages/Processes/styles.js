import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;

  div.processes {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  div.processSearch {
    padding: 30px;
    width: 100vh;
  }

  div.process {
    display: flex;
    gap: 20px;
  }

  td.action-column {
    min-width: 90px;
    width: fit-content;
  }

  svg {
    color: #000001;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  div.processName {
    background-color: #1b9454;
    border-radius: 10px;
    padding: 5px;
    color: #f1f1f1;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  div.processName > :first-child {
    margin-left: 0.5em;
  }

  div.currentStage-green {
    background-color: #1b9454;
    color: white;
  }

  div.currentStage-red {
    background-color: rgb(222, 83, 83);
    color: white;
  }

  div.finalStage {
    background-color: #1b9454;
  }
`;

export const AddProcess = styled.button`
  cursor: pointer;
  bottom: 30px;
  left: 30px;
  position: absolute;
  padding: 10px 15px;
  background-color: #304974;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: none;
  border-radius: 20px;
`;

export const Table = styled.table`
  background-color: white;
  width: 100%;
  max-width: 80vh;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;

  th {
    background-color: #7a7b4f;
    padding: 15px;
    border: 1px solid #ddd;
  }

  th:last-child {
    width: 70px;
  }

  tr.currentStage-red {
    td {
      background-color: rgb(222, 83, 83);
      color: white;
    }
  }
  tr.currentStage-green {
    td {
      background-color: rgb(27, 148, 84);
      color: white;
    }
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  td {
    border-radius: 5px;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
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
