import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 300px;
  background-color: #f1f1f1;
  color: black;
  font-size: 40px;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 0.3em 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoutButton = styled.div`
  bottom: 10px;
  position: absolute;
  width: calc(100% - 60px);
`;

export const MenuItem = styled.a`
  display: flex;
  font-size: 30px;
  width: 100%;
  text-align: left;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export const Notification = styled.div`
  position: absolute;
  left: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  background-color: red;
`;
