import styled from 'styled-components';

export const ModalStyle = styled.div`
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
  align-items: justify;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 10px;
  overflow-x: hidden;
`;
