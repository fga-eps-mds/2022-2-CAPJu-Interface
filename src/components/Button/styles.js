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

export const ButtonEdge = styled.button`
  display: flex;
  background: #304974;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 8px;
  font-size: 0.65rem;
  line-height: 1;
  color: #fff;

  :hover {
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  }
`;

export const BtnStyle = styled.button.attrs((props) => ({
  background: props.background || '#304974'
}))`
  color: #f1f1f1;
  background-color: #304974;
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  width: 130px;
  font-size: 20px;
`;

export const ButtonAdd = styled.button.attrs((props) => ({
  background: props.background || '#304974'
}))`
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  :hover {
    background-color: #5cbf2a;
  }
  :active {
    position: relative;
    top: 1px;
  }
`;
