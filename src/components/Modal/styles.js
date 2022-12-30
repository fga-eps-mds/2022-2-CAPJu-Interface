import styled from 'styled-components';

export const ModalStyle = styled.div`
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

export const Xbutton = styled.button`
  cursor: pointer;
  color: #f1f1f1;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1em;
  align-self: center;
  text-shadow: 2px 1px 1px black;
`;
