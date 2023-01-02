import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-dropdown';
import Button from 'components/Button/Button';

import api from 'services/user';
import { Container, InputSearch, Content, ContentHeader } from './sytles.js';
import Table from 'components/Tables/Table';
import Modal from 'components/Modal/Modal';
import authConfig from 'services/config';

function AccessProfile() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [newRole, setNewRole] = useState(null);
  const [roleModal, setRoleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const authHeader = authConfig()?.headers;

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

  const getSelectedUser = useCallback(() => {
    return users.find((user) => user._id == selectedUser);
  }, [users, selectedUser]);

  const updateUser = useCallback(async () => {
    const response = await api.get('/allUser', {
      headers: authHeader
    });
    setUsers(response.data.user);
  }, [authHeader]);

  const editRole = useCallback(async () => {
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
  }, [authHeader, newRole, selectedUser]);

  const handleChange = useCallback((event) => {
    setSearchUser(event.target.value);
  }, []);

  const handleChangeRole = useCallback((e) => setNewRole(e.value), []);

  const handleEditRole = useCallback(async () => {
    await editRole();
    await updateUser();
    setRoleModal(false);
  }, [editRole, updateUser, setRoleModal]);

  const handleRoleModal = useCallback(() => {
    setRoleModal(!roleModal);
  }, [roleModal]);

  const handleDeleteModal = useCallback(() => {
    setDeleteModal(!deleteModal);
  }, [deleteModal]);

  useEffect(() => {
    updateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = useCallback(
    async (userId) => {
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
          toast.error(
            'Erro ao deletar usuário!' + error.response.data.message,
            {
              duration: 3000
            }
          );
        }
      }
    },
    [authHeader]
  );

  const handleDeleteUser = useCallback(async () => {
    await deleteUser(getSelectedUser()._id);
    await updateUser();
    setDeleteModal(false);
  }, [deleteUser, updateUser, setDeleteModal, getSelectedUser]);

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
          <Modal title="Editar Perfil de Acesso">
            <Content>
              <span>Escolha um Perfil</span>
              <Dropdown
                options={roles}
                onChange={handleChangeRole}
                value={getUserRole(getSelectedUser())}
                placeholder="Selecione o perfil"
                className="dropdown"
                controlClassName="dropdown-control"
                placeholderClassName="dropdown-placeholder"
                menuClassName="dropdown-menu"
                arrowClassName="dropdown-arrow"
              />
              <div>
                <Button onClick={handleEditRole}>Salvar</Button>
                <Button onClick={handleRoleModal} background="#DE5353">
                  Cancelar
                </Button>
              </div>
            </Content>
          </Modal>
        )}
        {deleteModal && (
          <Modal title="Excluir Usuário">
            <Content>
              <span>Deseja realmente excluir Usuário?</span>
              {getSelectedUser().name}
              <div>
                <Button onClick={handleDeleteUser}>Confirmar</Button>
                <Button onClick={handleDeleteModal} background="#DE5353">
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
