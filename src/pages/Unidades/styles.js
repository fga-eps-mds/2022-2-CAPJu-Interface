import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 50px;
  flex-direction: column;
  margin: 0px 100px;

  svg.delete-icon {
    cursor: pointer;
    color: black;
  }
`;

export const AddUnityButton = styled.button`
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

export const Area = styled.div`
  padding: 0px 100px;
  width: 100%;
  color: black;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-direction: row;
`;

export const StageItem = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 100px;
  background-color: #1b9454;
  color: white;
  padding: 20px;
  font-size: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  height: 80vh;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  overflow-x: scroll;
  align-items: center;
`;

export const Table = styled.table`
  margin-top: 20px;
  background-color: white;
  width: 70%;
  max-width: 80%;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;
  align-items: center;
  margin-left: 15%;
  margin-right: 15%;

  th {
    background-color: #7a7b4f;
    padding: 15px;
    border: 1px solid #ddd;
  }

  th:nth-child(2) {
    width: 15px;
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
