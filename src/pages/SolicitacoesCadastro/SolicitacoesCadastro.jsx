import React from 'react';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { Check } from '@styled-icons/entypo/Check';
import { Delete } from '@styled-icons/typicons/Delete';

import {
  Container,
  Table,
  Area,
  Modal,
  Content,
  ContentHeader
} from './styles';
import api from 'services/user';
import authConfig from 'services/config.js';
import Button from 'components/Button/Button';

function SolicitacoesCadastro() {
  const [users, setUsers] = useState([]);
  const [acceptModal, setAcceptModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const authHeader = authConfig()?.headers;
  useEffect(() => {
    updateSolicitacoes();
    // eslint-disable-next-line
  }, []);

  async function updateSolicitacoes() {
    const allUser = await api.get(`/allUser?accepted=true`, {
      headers: authHeader
    });
    const idUser = JSON.parse(localStorage.getItem('user'));
    for (let user of allUser.data.user) {
      if (user._id == idUser._id)
        localStorage.setItem('unitys', JSON.stringify(user.unity));
    }
    const unidade = localStorage.getItem('unitys');
    const trataUnidade = unidade?.replace(/"/g, '');
    const response = await api.get(`/allUser?accepted=false`, {
      headers: authHeader
    });

    const targetUsers = [];
    const pendingUsers = response.data.user;
    for (let users of pendingUsers) {
      if (users.unity == trataUnidade) {
        targetUsers.push(users);
      }
    }
    setUsers(pendingUsers);
  }

  async function acceptRequest(userId) {
    try {
      const response = await api.post(`/acceptRequest/${userId}`, null, {
        headers: authHeader
      });
      if (response.status == 200) {
        toast.success('Solicitação aceita com sucesso!', { duration: 3000 });
      } else {
        toast.error('Erro ao aceitar solicitação!', { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao aceitar solicitação!', { duration: 3000 });
      }
    }
  }

  async function deleteRequest(userId) {
    try {
      const response = await api.delete(`/deleteRequest/${userId}`, {
        headers: authHeader
      });
      if (response.status == 200) {
        toast.success('Solicitação recusada com sucesso!', { duration: 3000 });
      } else {
        toast.error('Erro ao recusar solicitação!', { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao recusar solicitação!', { duration: 3000 });
      }
    }
  }

  return (
    <Container>
      <h1>Solicitações de Cadastro</h1>
      <Area>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          {users.map((users, index) => {
            return (
              <tr key={index}>
                <td>{users.name}</td>
                <td className="actionButtons">
                  <Tooltip title="Aceitar solicitação">
                    <Check
                      className="check-icon"
                      size={30}
                      onClick={() => {
                        setAcceptModal(true);
                        setSelectedUser(index);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Recusar solicitação">
                    <Delete
                      className="delete-icon"
                      size={30}
                      onClick={() => {
                        setDeleteModal(true);
                        setSelectedUser(index);
                      }}
                    />
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </Table>
      </Area>

      {acceptModal && (
        <>
          <Modal>
            <Content>
              <ContentHeader>
                <span>Aceitar Solicitação</span>
              </ContentHeader>
              <span>Deseja realmente aceitar esta solicitação?</span>
              {users[selectedUser].name}
              <div>
                <Button
                  onClick={async () => {
                    await acceptRequest(users[selectedUser]._id);
                    await updateSolicitacoes();
                    setAcceptModal(false);
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => {
                    setAcceptModal(false);
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
                <span>Recusar Solicitação</span>
              </ContentHeader>
              <span>Deseja realmente recusar esta solicitação?</span>
              {users[selectedUser].name}
              <div>
                <Button
                  onClick={async () => {
                    await deleteRequest(users[selectedUser]._id);
                    await updateSolicitacoes();
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
    </Container>
  );
}

export default SolicitacoesCadastro;
