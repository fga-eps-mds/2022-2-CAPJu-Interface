import Button from 'components/Button';
import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../services/user';
import authConfig from 'services/config';
import {
  Container,
  MenuItem,
  Menu,
  LogoutButton,
  Notification
} from './styles';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { FlowCascade } from '@styled-icons/entypo';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
import { UserPlus } from '@styled-icons/boxicons-regular/UserPlus';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from '@styled-icons/boxicons-regular/';
import { GroupWork } from '@styled-icons/material/';

function SideBar() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const authHeader = authConfig().headers;

  useEffect(() => {
    updateNotification();
    // eslint-disable-next-line
  }, []);

  async function updateNotification() {
    const response = await api.get(`/allUser?accepted=false`, {
      headers: authHeader
    });
    setUsers(response.data.user);
  }

  const userLogout = JSON.parse(localStorage.getItem('user'));
  console.log('sono', userLogout);

  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <Menu>
        <hr />

        <MenuItem href={'/unidades'}>
          <GroupWork size={35} />
          Unidades
        </MenuItem>
        <hr />

        <MenuItem href={'/stages'}>
          <Flow size={35} />
          Etapas
        </MenuItem>
        <hr />

        <MenuItem href={'/'}>
          <FlowCascade size={35} />
          Fluxos
        </MenuItem>
        <hr />

        <MenuItem
          href=""
          onClick={() =>
            navigate('/processes', { state: undefined, replace: false })
          }
        >
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <Menu>
          <MenuItem href={'/solicitacoes'}>
            <UserPlus size={35} />
            Solicitações
            {users.length >= 1 ? (
              <Notification>{users.length}</Notification>
            ) : (
              ''
            )}
          </MenuItem>
          <hr />

          <MenuItem href={'/accessProfile'}>
            <PersonFill size={35} /> Perfil de Acesso
          </MenuItem>
          <hr />

          <MenuItem
            href=""
            onClick={() =>
              navigate('/editAccount', { state: undefined, replace: false })
            }
          >
            <UserCircle size={35} />
            Editar Conta
          </MenuItem>
          <hr />
        </Menu>
      </Menu>
      {userLogout ? (
        <LogoutButton>
          <Button
            background="red"
            onClick={() => {
              localStorage.removeItem('user');
              navigate('Login');
            }}
          >
            Sair
          </Button>
        </LogoutButton>
      ) : (
        ''
      )}
    </Container>
  );
}

export default SideBar;
