import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  align-items: center;
  font-size: 20px;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;

  div.processInfo {
    margin-top: 2px;
    width: 100%;
    color: black;
    display: flex;
    align-items: center;
    font-size: 20px;

    flex-direction: column;
    gap: 20px;

    div {
      background-color: #1b9454;
      padding: 10px 30px;
      color: #f1f1f1;
      border-radius: 10px;
    }
  }

  a {
    align-self: center;
    text-decoration: none;
    color: #f1f1f1;
    background-color: #304974;
    border-radius: 20px;
    padding: 10px 15px;
    font-weight: bold;
  }

  div.modal-header {
    background-color: red;
    color: #f1f1f1;
  }
`;

export const FlowWrapper = styled.div`
  max-width: 500px;
  max-height: 500px;
`;
