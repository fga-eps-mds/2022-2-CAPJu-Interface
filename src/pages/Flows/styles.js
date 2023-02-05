import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 50px;
  flex-direction: column;
  margin: 0px 100px;

  svg.edit-icon {
    cursor: pointer;
  }

  svg.delete-icon {
    cursor: pointer;
  }
`;

export const AddFlowButton = styled.button`
  cursor: pointer;
  position: relative;
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

  div.addStage {
    cursor: pointer;
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
  overflow-x: hidden;
`;

export const ContentHeader = styled.div`
  display: flex;
  background-color: #7a7b4f;
  min-width: 800px;
  max-height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 32px;
  height: 15vh;
  width: 100%;
  padding: 5px;
  span {
    color: #f1f1f1;
    margin-left: 39%;
  }
`;

export const CloseModalGeneral = styled(CloseOutline)`
  color: #f1f1f1;
  height: 32px;
  width: 32px;
  cursor: pointer;
  // margin-left: 95%;
  min-widht: 35px;
  min-height: 35px;
`;

export const DivFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 50em;
  width: 47%;
`;

export const LabelDiv = styled.div`
  display: flex;
  align-items: center;
  width: 19em;
  justify-content: space-between;
`;
