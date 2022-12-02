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

  svg.see-process {
    color: #000001;
    cursor: pointer;
  }

  svg.edit-process {
    color: #000001;
    cursor: pointer;
  }

  svg.delete-process {
    color: #000001;
    cursor: pointer;
  }

  div.currentStage-green {
    background-color: #1b9454;
    color: white;
  }

  div.currentStage-red {
    background-color: #de5353;
    color: white;
  }

  div.finalStage {
    background-color: #1b9454;
  }
`;

export const Modal = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;

export const ContentHeader = styled.div`
  display: flex;
  background-color: #7a7b4f;
  min-width: 800px;
  max-height: 50px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 32px;
  height: 15vh;
  width: 50%;
  padding: 5px;
  span {
    color: #f1f1f1;
  }
`;

export const Content = styled.div`
  display: flex;
  background-color: white;
  min-width: 800px;
  max-height: 90vh;
  min-height: 60vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  overflow-x: scroll;
`;

export const AddProcess = styled.button`
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
      background-color: #f7baba;
    }
  }
  tr.currentStage-green {
    td {
      background-color: #a3d4b9;
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
