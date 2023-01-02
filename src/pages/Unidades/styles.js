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
