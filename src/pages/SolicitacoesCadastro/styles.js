import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 24px;
  flex-direction: column;
  gap: 50px;
  margin: 0px 100px;

  svg.check-icon {
    cursor: pointer;
    color: green;
  }

  svg.delete-icon {
    cursor: pointer;
    color: #e01616;
  }
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
