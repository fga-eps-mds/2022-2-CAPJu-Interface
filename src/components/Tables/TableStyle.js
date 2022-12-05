import styled from 'styled-components';

export const DefaultTable = styled.table`
  margin-top: 20px;
  background-color: white;
  min-width: 35vw;
  font-size: 20px;
  border-radius: 5px;
  text-align: left;
  color: white;
  align-items: center;
  margin-left: 15%;
  margin-right: 15%;

  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  th {
    border-radius: 5px;
    background-color: #7a7b4f;
    padding: 20px 0px 20px 10px;
    border: 1px solid #ddd;
  }

  th.actions-column {
    padding-right: 10px;
  }

  td.actions-column {
    min-width: fit-content;
    width: 1%;
    white-space: nowrap;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  svg.accept-button {
    color: #00ff00;
  }

  svg.deny-button {
    color: #ff0000;
  }

  td {
    border-radius: 5px;
    color: #333;
    padding: 10px 0px 10px 10px;
    border: 1px solid #ddd;
  }
`;
