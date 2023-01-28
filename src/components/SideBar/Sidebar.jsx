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
import hasPermission from 'util/permissionChecker';
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
    setUsers(response.data);
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
          disabled={!hasPermission(user, 'view-unity')}
        >
          <GroupWork size={35} />
          Unidades
        </MenuItem>
        <hr />

        <MenuItem
          href={'/stages'}
          disabled={!hasPermission(user, 'view-stage')}
        >
          <Flow size={35} />
          Etapas
        </MenuItem>
        <hr />

        <MenuItem href={'/'} disabled={!hasPermission(user, 'view-flow')}>
          <FlowCascade size={35} />
          Fluxos
        </MenuItem>
        <hr />

        <MenuItem
          href="/processes"
          disabled={!hasPermission(user, 'view-process')}
        >
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <Menu>
          <MenuItem
            href={'/solicitacoes'}
            disabled={!hasPermission(user, 'accept-user')}
          >
            <UserPlus size={35} />
            Solicitações
            {users.length >= 1 && <Notification>{users.length}</Notification>}
          </MenuItem>
          <hr />

          <MenuItem
            href={'/accessProfile'}
            disabled={!hasPermission(user, 'view-user')}
          >
            <PersonFill size={35} /> Perfil de Acesso
          </MenuItem>
          <hr />

          <MenuItem
            href="/editAccount"
            disabled={!hasPermission(user, 'edit-account')}
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
