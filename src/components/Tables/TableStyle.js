import styled from 'styled-components';

export const DefaultTable = styled.table`
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

  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

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
