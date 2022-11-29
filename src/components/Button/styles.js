import styled from 'styled-components';

export const Container = styled.button.attrs((props) => ({
  background: props.background || '#304974'
}))`
  background-color: ${(props) => props.background};
  border: solid #888 2px;
  padding: 10px 20px;
  min-width: 150px;
  color: white;
  border-radius: 20px;
  margin: 10px;
  font-size: 20px;

  :hover {
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    color: black;
    transition: 0.4s;
    border: solid black 2px;
  }
`;
