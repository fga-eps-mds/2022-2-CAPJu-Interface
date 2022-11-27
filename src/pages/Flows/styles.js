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

export const FlowItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-height: 100px;
  background-color: #1b9454;
  color: white;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  span.title-flow {
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 5%;
  }
`;

export const Table = styled.table`
  background-color: white;
  width: 600px;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;

  th {
    background-color: #7a7b4f;
    padding: 15px;
    border: 1px solid #ddd;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th:nth-child(2) {
    width: 100px;
  }

  td {
    border-radius: 5px;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
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

  div.addStage {
    cursor: pointer;
  }
`;

export const ModalDelete = styled.div`
  position: absolute;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ContentDelete = styled.div`
  display: flex;
  background-color: white;
  min-width: 600px;
  height: 28vh;
  min-height: 150px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  border-radius: 10px;
  gap: 25px;
  padding: 10px;
  font-weight: bold;
  overflow-x: scroll;

  div.closeModal {
    display: flex;
    flex-direction: row-reverse;
    min-width: 600px;
  }
`;

export const CloseModalDelete = styled(CloseOutline)`
  color: #de5353;
  height: 5vh;
  width: 5vh;
  min-widht: 30px;
  min-height: 30px;
  cursor: pointer;
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
`;

export const StageName = styled.div`
  background-color: #fbe304;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const StagesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const SequencesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: column;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
`;

export const SequenceItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  gap: 10px;
  font-size: 20px;
  border-radius: 20px;
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
  width: 50%;
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

export const FlowsButtons = styled.div`
  display: flex;
  flex-direction: rows;
  min-width: 100px;
  color: white;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
