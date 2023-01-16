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

  const user = JSON.parse(localStorage.getItem('user'));
  const disableUnity = verifyRole(user, 'visualizar-unidade');
  const disableStage = verifyRole(user, 'visualizar-etapa');
  const disableFlow = verifyRole(user, 'visualizar-fluxo');
  const disableProcess = verifyRole(user, 'visualizar-processo');
  const disableAcceptUser = verifyRole(user, 'aceitar-usuario');
  const disableAccessProfile = verifyRole(user, 'visualizar-usuario');
  const disableEditAccount = verifyRole(user, 'editar-conta');

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
          className={!disableUnity && 'disable-item'}
        >
          <GroupWork size={35} />
          Unidades
        </MenuItem>
        <hr />

        <MenuItem href={'/stages'} className={!disableStage && 'disable-item'}>
          <Flow size={35} />
          Etapas
        </MenuItem>
        <hr />

        <MenuItem href={'/'} className={!disableFlow && 'disable-item'}>
          <FlowCascade size={35} />
          Fluxos
        </MenuItem>
        <hr />

        <MenuItem
          href="/processes"
          className={!disableProcess && 'disable-item'}
        >
          <ClipboardTaskListLtr size={35} />
          Processos
        </MenuItem>
        <hr />
        <Menu>
          <MenuItem
            href={'/solicitacoes'}
            className={!disableAcceptUser && 'disable-item'}
          >
            <UserPlus size={35} />
            Solicitações
            {users.length >= 1 && <Notification>{users.length}</Notification>}
          </MenuItem>
          <hr />

          <MenuItem
            href={'/accessProfile'}
            className={!disableAccessProfile && 'disable-item'}
          >
            <PersonFill size={35} /> Perfil de Acesso
          </MenuItem>
          <hr />

          <MenuItem
            href="/editAccount"
            className={!disableEditAccount && 'disable-item'}
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
