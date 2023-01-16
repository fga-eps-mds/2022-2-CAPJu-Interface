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
  Disable,
  Menu,
  LogoutButton,
  Notification
} from './styles';

function SideBar() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const authHeader = authConfig()?.headers;

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

  /*   const permissionsArray = [
    { name: 'DIRETOR', id: 1, permissions: [1, 2, 3] },
    { name: 'JUIZ', id: 2, permissions: [1, 2, 3] },
    { name: 'SERVIDOR', id: 3, permissions: [1, 2, 3] },
    { name: 'ESTAGIARIO', id: 4, permissions: [] }
  ];

  function verifyRole(user) {
    if (user == null) {
      return true;
    } else {
      const profile = permissionsArray.find((p) => p.id === user.role);
      const hasPermission = profile.permissions.includes(1);
      console.log(hasPermission);
      return hasPermission;
    }
  } */

  const user = JSON.parse(localStorage.getItem('user'));

  const userLogout = JSON.parse(localStorage.getItem('user'));
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

        <MenuItem href="/processes">
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <Menu>
          <MenuItem href={'/solicitacoes'}>
            <UserPlus size={35} />
            Solicitações
            {users.length >= 1 && <Notification>{users.length}</Notification>}
          </MenuItem>
          <hr />

          {verifyRole(user, 'visualizar-usuario') ? (
            <>
              <MenuItem href={'/accessProfile'}>
                <PersonFill size={35} /> Perfil de Acesso
              </MenuItem>
              <hr />
            </>
          ) : (
            <>
              <Disable href={'/accessProfile'}>
                <MenuItem href={'/accessProfile'}>
                  <PersonFill size={35} /> Perfil de Acesso
                </MenuItem>
              </Disable>
              <hr />
            </>
          )}

          <MenuItem href="/editAccount">
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
