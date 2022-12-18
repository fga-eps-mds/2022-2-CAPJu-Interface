import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-dropdown';
import Button from 'components/Button/Button';

import api from 'services/user';
import {
  Container,
  InputSearch,
  Modal,
  Content,
  ContentHeader
} from './sytles.js';
import Table from 'components/Tables/Table';
import authConfig from 'services/config';

function AccessProfile() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [newRole, setNewRole] = useState(null);
  const [roleModal, setRoleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const handleChange = useCallback((event) => {
    setSearchUser(event.target.value);
  }, []);

  const authHeader = authConfig()?.headers;

  useEffect(() => {
    updateUser();
    // eslint-disable-next-line
  }, []);

  async function updateUser() {
    const response = await api.get('/allUser', {
      headers: authHeader
    });
    setUsers(response.data.user);
  }

  async function editRole() {
    try {
      const response = await api.put(
        '/updateRole',
        { _id: selectedUser, role: newRole },
        { headers: authHeader }
      );

      if (response.status == 200) {
        toast.success('Perfil alterado com sucesso');
      } else {
        toast.error('Erro ao alterar o perfil');
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao tentar alterar o perfil');
      }
    }
  }

  async function deleteUser(userId) {
    try {
      const response = await api.delete(`/deleteRequest/${userId}`, {
        headers: authHeader
      });
      if (response.status == 200) {
        toast.success('Usuário deletado com sucesso!', { duration: 3000 });
      } else {
        toast.error('Erro ao deletar o usuário');
      }
    } catch (error) {
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao deletar usuário!' + error.response.data.message, {
          duration: 3000
        });
      }
    }
  }

  const filterUser = (arr) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return arr.filter((users) => {
      if (
        (users.name.toLowerCase().includes(searchUser.toLocaleLowerCase()) ||
          users.name.includes(searchUser)) &&
        users.email !== user.email
      )
        return users;
    });
  };

  const actionList = [
    {
      tooltip: 'Editar perfil',
      action: (user) => {
        setRoleModal(true);
        setSelectedUser(user._id);
      },
      type: 'edit'
    },
    {
      tooltip: 'Deletar Perfil',
      action: (user) => {
        setDeleteModal(true);
        setSelectedUser(user._id);
      },
      type: 'delete'
    }
  ];

  const roles = useMemo(
    () => [
      { label: 'Diretor', value: 1 },
      { label: 'Juiz', value: 2 },
      { label: 'Servidor', value: 3 },
      { label: 'Estagiario', value: 4 }
    ],
    []
  );

  const getUserRole = useCallback(
    (user) => {
      return roles.find((role) => role.value == user.role).label;
    },
    [roles]
  );

  function getSelectedUser() {
    return users.find((user) => user._id == selectedUser);
  }

  const getAttributesForDisplay = useCallback(
    (user) => {
      return [
        user.name,
        getUserRole(user),
        user.accepted ? 'Aceito' : 'Pendente'
      ];
    },
    [getUserRole]
  );

  const columnHeaders = ['Nome', 'Perfil', 'Status'];
  return (
    <Container>
      <div className="userstyle ">
        <span>Perfil de Acesso</span>
        <div className="search">
          <InputSearch
            value={searchUser}
            onChange={handleChange}
            placeholder={'Buscar Usuário'}
          />
        </div>
        <Table
          columnList={columnHeaders}
          actionList={actionList}
          itemList={filterUser(users)}
          attributeList={getAttributesForDisplay}
        />
        {roleModal && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Editar Perfil de Acesso</span>
              </ContentHeader>
              <span>Escolha um Perfil</span>
              <Dropdown
                options={roles}
                onChange={(e) => setNewRole(e.value)}
                value={getUserRole(getSelectedUser())}
                placeholder="Selecione o perfil"
                className="dropdown"
                controlClassName="dropdown-control"
                placeholderClassName="dropdown-placeholder"
                menuClassName="dropdown-menu"
                arrowClassName="dropdown-arrow"
              />
              <div>
                <Button
                  onClick={async () => {
                    await editRole();
                    await updateUser();
                    setRoleModal(false);
                  }}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    setRoleModal(false);
                  }}
                  background="#DE5353"
                >
                  Cancelar
                </Button>
              </div>
            </Content>
          </Modal>
        )}
        {deleteModal && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Excluir Usuário</span>
              </ContentHeader>
              <span>Deseja realmente excluir Usuário?</span>
              {getSelectedUser().name}
              <div>
                <Button
                  onClick={async () => {
                    await deleteUser(getSelectedUser()._id);
                    await updateUser();
                    setDeleteModal(false);
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => {
                    setDeleteModal(false);
                  }}
                  background="#DE5353"
                >
                  Cancelar
                </Button>
              </div>
            </Content>
          </Modal>
        )}
      </div>
    </Container>
  );
}

export default AccessProfile;
