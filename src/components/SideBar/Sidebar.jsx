import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowCascade } from '@styled-icons/entypo';
import { GroupWork } from '@styled-icons/material/';
import { UserCircle } from '@styled-icons/boxicons-regular/';
import { Flow } from '@styled-icons/fluentui-system-regular';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
import { UserPlus } from '@styled-icons/boxicons-regular/UserPlus';
import { ClipboardTaskListLtr } from '@styled-icons/fluentui-system-regular/ClipboardTaskListLtr';

import api from 'services/user';
import Button from 'components/Button/Button';
import authConfig from 'services/config';
import verifyRole from 'util/permissionChecker';
import {
  Container,
  MenuItem,
  Menu,
  LogoutButton,
  Notification
} from './styles';

function SideBar() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const authHeader = authConfig()?.headers;

  const user = JSON.parse(localStorage.getItem('user'));

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
  return (
    <Container>
      <a href={'/'}>
        <img src={'./logo.png'} />
      </a>
      <Menu>
        <hr />
        <MenuItem
          href={'/unidades'}
          disabled={!verifyRole(user, 'visualizar-unidade')}
        >
          <GroupWork size={35} />
          Unidades
        </MenuItem>
        <hr />

        <MenuItem
          href={'/stages'}
          disabled={!verifyRole(user, 'visualizar-etapa')}
        >
          <Flow size={35} />
          Etapas
        </MenuItem>
        <hr />

        <MenuItem href={'/'} disabled={!verifyRole(user, 'visualizar-fluxo')}>
          <FlowCascade size={35} />
          Fluxos
        </MenuItem>
        <hr />

        <MenuItem
          href="/processes"
          disabled={!verifyRole(user, 'visualizar-processo')}
        >
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <Menu>
          <MenuItem
            href={'/solicitacoes'}
            disabled={!verifyRole(user, 'aceitar-usuario')}
          >
            <UserPlus size={35} />
            Solicitações
            {users.length >= 1 && <Notification>{users.length}</Notification>}
          </MenuItem>
          <hr />

          <MenuItem
            href={'/accessProfile'}
            disabled={!verifyRole(user, 'visualizar-usuario')}
          >
            <PersonFill size={35} /> Perfil de Acesso
          </MenuItem>
          <hr />

          <MenuItem
            href="/editAccount"
            disabled={!verifyRole(user, 'editar-conta')}
          >
            <UserCircle size={35} />
            Editar Conta
          </MenuItem>
          <hr />
        </Menu>
      </Menu>
      {userLogout && (
        <LogoutButton>
          <Button
            background="rgb(222, 83, 83)"
            onClick={() => {
              localStorage.removeItem('user');
              navigate('Login');
            }}
            text={'Sair'}
          />
        </LogoutButton>
      )}
    </Container>
  );
}

export default SideBar;
