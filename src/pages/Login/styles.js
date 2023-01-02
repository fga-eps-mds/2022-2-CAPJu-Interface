import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;

  flex-direction: column;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const MenuElement = styled.div.attrs((props) => ({
  selected: props.selected
}))`
  margin: 10px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;

  border-bottom: ${(props) =>
    props.selected ? '3px solid lightblue' : '1px solid black'};
`;

export const ForgotPassword = styled.h6`
  cursor: pointer;
  text-decoration: underline;
`;
export const Criterios = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
export const EditDrop = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
