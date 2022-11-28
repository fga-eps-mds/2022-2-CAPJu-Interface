import styled from 'styled-components';

export const Container = styled.div`
  color: #f1f1f1;
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

export const Xbutton = styled.button`
  cursor: pointer;
  color: #f1f1f1;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1em;
  align-self: self-end;
  text-shadow: 2px 2px 1px black;
`;

export const Title = styled.strong`
  margin-right: auto;
  margin-left: auto;
`;
