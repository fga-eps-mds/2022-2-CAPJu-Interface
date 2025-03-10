import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

import { Container, Area, Modal, Content, ContentHeader } from './styles';
import Table from 'components/Tables/Table';
import api from 'services/user';
import authConfig from 'services/config.js';
import Button from 'components/Button/Button';
import hasPermission from 'util/permissionChecker';

function SolicitacoesCadastro() {
  const [users, setUsers] = useState([]);
  const [acceptModal, setAcceptModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

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
    for (let user of allUser.data) {
      if (user.cpf == idUser.cpf)
        localStorage.setItem('unitys', JSON.stringify(user.idUnit));
    }
    const unidade = localStorage.getItem('unitys');
    const trataUnidade = unidade?.replace(/"/g, '');
    const response = await api.get(`/allUser?accepted=false`, {
      headers: authHeader
    });

    const targetUsers = [];
    const pendingUsers = response.data;
    for (let users of pendingUsers) {
      if (users.idUnit == trataUnidade) {
        targetUsers.push(users);
      }
    }
    setUsers(targetUsers);
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

  function getUser(userId) {
    return users.find((user) => user._id == userId);
  }

  const actionList = [
    {
      tooltip: 'Aceitar solicitação',
      action: (user) => {
        setAcceptModal(true);
        setSelectedUser(user._id);
      },
      type: 'check',
      className: 'accept-button',
      disabled: !hasPermission(user, 'accept-user')
    },
    {
      tooltip: 'Recusar solicitação',
      action: (user) => {
        setDeleteModal(true);
        setSelectedUser(user._id);
      },
      type: 'deny',
      className: 'deny-button',
      disabled: !hasPermission(user, 'delete-user')
    }
  ];

  return (
    <Container>
      <h1>Solicitações de Cadastro</h1>
      <Area>
        <Table
          columnList={['Nome']}
          itemList={users}
          actionList={actionList}
          attributeList={(user) => [user.fullName]}
        />
      </Area>
      {acceptModal && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Aceitar Solicitação</span>
            </ContentHeader>
            <span>Deseja realmente aceitar esta solicitação?</span>
            {getUser(selectedUser).fullName}
            <div>
              <Button
                onClick={async () => {
                  await acceptRequest(getUser(selectedUser).cpf);
                  await updateSolicitacoes();
                  setAcceptModal(false);
                }}
                text={'Confirmar'}
              />
              <Button
                onClick={() => {
                  setAcceptModal(false);
                }}
                background="red"
                text={'Cancelar'}
              />
            </div>
          </Content>
        </Modal>
      )}
      {deleteModal && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Recusar Solicitação</span>
            </ContentHeader>
            <span>Deseja realmente recusar esta solicitação?</span>
            {getUser(selectedUser).fullName}
            <div>
              <Button
                onClick={async () => {
                  await deleteRequest(getUser(selectedUser).cpf);
                  await updateSolicitacoes();
                  setDeleteModal(false);
                }}
                text={'Confirmar'}
              />
              <Button
                onClick={() => {
                  setDeleteModal(false);
                }}
                background="red"
                text={'Cancelar'}
              />
            </div>
          </Content>
        </Modal>
      )}
    </Container>
  );
}

export default SolicitacoesCadastro;
