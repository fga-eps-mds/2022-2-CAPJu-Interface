import React from 'react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import Tooltip from '@mui/material/Tooltip';
import Button from 'components/Button/Button';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteForever } from '@mui/icons-material';

import api from 'services/user';
import {
  Container,
  Table,
  InputSearch,
  Modal,
  Content,
  ContentHeader
} from './sytles.js';
import authConfig from 'services/config';

function AccessProfile() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [newRole, setNewRole] = useState(null);
  const [roleModal, setRoleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const handleChange = (event) => {
    setSearchUser(event.target.value);
  };
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
        {
          _id: users[selectedUser]._id,
          role: newRole
        },
        { headers: authHeader }
      );

      if (response.status == 200) {
        toast.success('Role alterada com sucesso');
      } else {
        toast.error('Erro ao alterar Role');
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao tentar alterar Role');
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
      }
    } catch (error) {
      console.log(error);
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
      if (searchUser === '' && users.email !== user.email) {
        return users;
      } else if (
        (users.name.toLowerCase().includes(searchUser) ||
          users.name.toUpperCase().includes(searchUser) ||
          users.name.includes(searchUser)) &&
        users.email !== user.email
      ) {
        return users;
      }
    });
  };

  const OptionsRoles = [
    { label: 'DIRETOR', value: 1 },
    { label: 'JUIZ', value: 2 },
    { label: 'SERVIDOR', value: 3 },
    { label: 'ESTAGIARIO', value: 4 }
  ];

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
        <Table>
          <tr>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Status</th>
            <th></th>
          </tr>
          {filterUser(users).map((users, idx) => {
            let role;
            let accepted;
            switch (users.role) {
              case 1:
                role = 'Diretor';
                break;
              case 2:
                role = 'Juíz';
                break;
              case 3:
                role = 'Servidor';
                break;
              case 4:
                role = 'Estagiário';
                break;
              default:
                role = 'Nulo';
                break;
            }
            switch (users.accepted) {
              case false:
                accepted = 'Pendente';
                break;
              case true:
                accepted = 'Aceito';
                break;
              default:
                accepted = 'Nulo';
                break;
            }

            return (
              <tr key={idx}>
                <td>{users.name}</td>
                <td>{role}</td>
                <td>{accepted}</td>
                <td>
                  <Tooltip title="Editar Perfil">
                    <EditIcon
                      className="edit-icon"
                      htmlColor="black"
                      onClick={() => {
                        setRoleModal(true);
                        setSelectedUser(idx);
                      }}
                    ></EditIcon>
                  </Tooltip>
                  <Tooltip title="Deletar Perfil">
                    <DeleteForever
                      className="delete-icon"
                      htmlColor="black"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedUser(idx);
                      }}
                    ></DeleteForever>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </Table>
        {roleModal && (
          <>
            <Modal>
              <Content>
                <ContentHeader>
                  <span>Editar Perfil de Acesso</span>
                </ContentHeader>
                <span>Escolha um Perfil</span>
                <Dropdown
                  options={OptionsRoles}
                  onChange={(e) => {
                    setNewRole(e.value);
                  }}
                  value={
                    OptionsRoles.find(
                      (el) => el.value === users[selectedUser].role
                    ).label
                  }
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
                    background="red"
                  >
                    Cancelar
                  </Button>
                </div>
              </Content>
            </Modal>
          </>
        )}
        {deleteModal && (
          <>
            <Modal>
              <Content>
                <ContentHeader>
                  <span>Excluir Usuário</span>
                </ContentHeader>
                <span>Deseja realmente excluir Usuário?</span>
                {users[selectedUser].name}
                <div>
                  <Button
                    onClick={async () => {
                      await deleteUser(users[selectedUser]._id);
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
                    background="red"
                  >
                    Cancelar
                  </Button>
                </div>
              </Content>
            </Modal>
          </>
        )}
      </div>
    </Container>
  );
}

export default AccessProfile;
