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
  font-size: 18px;

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
  border-radius: 54px;
  border: 2px solid #18ab29;
  cursor: pointer;
  color: #ffffff;
  font-size: 18px;
  padding: 12px;

  :hover {
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);
    transition: 0.02s;
  }
  :active {
    position: relative;
    top: 1px;
  }
`;
