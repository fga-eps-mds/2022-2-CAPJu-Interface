import { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import './styles.js';
import Flows from 'pages/Flows/Flows';
import Login from 'pages/Login/Login';
import GlobalStyle from './globalStyles';
import Stages from 'pages/Stages/Stages';
import Recovery from 'pages/Recovery/Login';
import { Container, Content } from './styles';
import Unidades from 'pages/Unidades/Unidades';
import Processes from 'pages/Processes/Processes';
import Statistics from 'pages/Statistics/Statistics';
import SideBar from 'components/SideBar/ModalHeader';
import ShowProcess from 'pages/ShowProcess/ShowProcess';
import EditAccount from 'pages/EditAccount/EditAccount';
import AccessProfile from 'pages/AccessProfile/AccessProfile';
import StatisticsProcesses from 'pages/StatisticsProcesses/Processes';
import EditAccountEmail from 'pages/EditAccountEmail/EditAccountEmail';
import EditAccountPassword from 'pages/EditAccountPassword/EditAccountPassword';
import SolicitacoesCadastro from 'pages/SolicitacoesCadastro/SolicitacoesCadastro';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log(location.pathname);

  useEffect(() => {
    if (
      !localStorage.getItem('user') &&
      location.pathname != '/Login' &&
      !location.pathname.startsWith('/recovery/')
    ) {
      navigate('Login');
      return;
    }

    let currentDate = new Date();

    if (
      !localStorage.getItem('user') ||
      !JSON.parse(localStorage.getItem('user'))?.expiresIn ||
      new Date(JSON.parse(localStorage.getItem('user'))?.expiresIn) <
        currentDate
    ) {
      navigate('Login');
      return;
    }
    if (!user) {
      setUser(localStorage.getItem('user'));
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <GlobalStyle />
      <Toaster position="top-right"></Toaster>
      <Container>
        <SideBar />
        <Content>
          <Routes>
            <Route path="/" element={<Flows />} />
            <Route path="login" element={<Login />} />
            <Route path="recovery">
              <Route path=":hash" element={<Recovery />} />
            </Route>
            <Route path="accessProfile" element={<AccessProfile />} />
            <Route path="stages" element={<Stages />} />
            <Route path="unidades" element={<Unidades />} />
            <Route path="processes" element={<Processes />} />
            <Route path="processes/showProcess" element={<ShowProcess />} />
            <Route path="statistics" element={<Statistics />} />
            <Route
              path="statistics/stageProcesses"
              element={<StatisticsProcesses />}
            />
            <Route
              path="statistics/stageProcesses/showProcess"
              element={<ShowProcess />}
            />
            <Route path="editAccount" element={<EditAccount />} />
            <Route path="editAccount/email" element={<EditAccountEmail />} />
            <Route path="editAccount/senha" element={<EditAccountPassword />} />
            <Route path="solicitacoes" element={<SolicitacoesCadastro />} />
          </Routes>
        </Content>
      </Container>
    </>
  );
}

export default App;
