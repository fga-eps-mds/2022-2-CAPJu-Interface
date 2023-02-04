import toast from 'react-hot-toast';
import React, { useEffect, useState, useCallback } from 'react';
import AxiosError from 'axios/lib/core/AxiosError';

import {
  Container,
  AddUnityButton,
  Modal,
  Content,
  ContentHeader
} from './styles';
import Table from 'components/Tables/Table';
import api from 'services/api';
import userApi from 'services/user';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import hasPermission from 'util/permissionChecker';

function Unidades() {
  const [unitList, setUnitList] = useState([
    { name: '', time: '', idUnit: '' }
  ]);
  const [UnityName, setUnityName] = useState('');
  const [adminSearchName, setAdminSearchName] = useState('');
  const [currentUnity, setCurrentUnity] = useState({
    name: '',
    idUnit: '',
    admins: []
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSeeAdminsModalOpen, setSeeAdminsModalOpen] = useState(false);
  const [isAddAdminsModalOpen, setAddAdminsModalOpen] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    updateUnitys();
  }, []);

  async function searchUsers(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    const response = await userApi.get('/allUser?accepted=true');
    setFoundUsers(response.data);
    setAddAdminsModalOpen(true);
  }

  async function setAdmin(obj) {
    setAddAdminsModalOpen(true);
    const body = {
      idUnit: currentUnity.idUnit,
      cpf: obj.cpf
    };
    const response = await userApi.put('setUnitAdmin/', body);
    if (response.status == 200) {
      toast.success('Administrador de unidade adicionado com sucesso');
    }
  }

  const clearUnityModal = useCallback(() => {
    setModalOpen(!isModalOpen);
    setUnityName('');
  }, [setModalOpen, isModalOpen]);

  async function updateUnityAdmins(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    const response = await api.get('unitAdmins/' + unit.idUnit);
    let existingUnity = { ...unit };
    existingUnity.admins = response.data || [];
    setCurrentUnity(existingUnity);
    setSeeAdminsModalOpen(true);
  }

  async function removeAdmin(cpf) {
    const body = {
      idUnit: currentUnity.idUnit,
      cpf
    };
    const response = await userApi.put('/removeUnitAdmin', body);
    if (response.status == 200) {
      toast.success('Administrador removido com sucesso');
      updateUnityAdmins(currentUnity);
    }
  }

  async function updateUnitys() {
    const response = await api.get('/units');
    setUnitList(response.data);
  }

  function filterUsers() {
    return foundUsers.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(adminSearchName.toLowerCase()) &&
        user.idUnit === currentUnity.idUnit &&
        user.idRole != 5
      );
    });
  }

  async function addUnity() {
    try {
      const response = await api.post('/newUnit', {
        name: UnityName
      });

      if (response.status == 200) {
        toast.success('Unidade Adicionada com sucesso');
        updateUnitys();
      } else {
        toast.error('Erro ao adicionar a unidade');
      }
    } catch (e) {
      if (e.response.status == 401) {
        toast(e.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao adicionar a unidade');
      }
      if (e instanceof AxiosError) toast.error('Unidade já existe');
    }
  }

  const newAdminActions = [
    {
      tooltip: 'Adicionar como Admin',
      action: setAdmin,
      type: 'addUser'
    }
  ];
  const removeAdminsActions = [
    {
      tooltip: 'Deletar',
      action: (user) => removeAdmin(user.cpf),
      type: 'delete'
    }
  ];
  const unitListActions = [
    {
      tooltip: 'Visualizar Admins',
      action: updateUnityAdmins,
      type: 'eye',
      disabled: !hasPermission(user, 'view-admins')
    },
    {
      tooltip: 'Adicionar Admins',
      action: searchUsers,
      type: 'addUser',
      disabled: !hasPermission(user, 'add-admin-in-unit')
    }
  ];

  return (
    <>
      <Container>
        <h1>Unidades</h1>
        <Table
          itemList={unitList}
          actionList={unitListActions}
          columnList={['Nome']}
          attributeList={(unit) => [unit.name]}
        />
        <AddUnityButton
          onClick={() => {
            clearUnityModal();
            setModalOpen(true);
          }}
          disabled={!hasPermission(user, 'create-unit')}
        >
          + Adicionar Unidade
        </AddUnityButton>
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Criar Unidade</span>
            </ContentHeader>
            <div>
              {/* <p> Nome </p> */}

              <TextInput
                label="Nome"
                set={setUnityName}
                value={UnityName}
                placeholder="Nome da unidade"
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  addUnity();
                  setModalOpen(false);
                }}
                text={'Salvar'}
              />
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                background="#DE5353"
                text={'Cancelar'}
              />
            </div>
          </Content>
        </Modal>
      )}
      {isSeeAdminsModalOpen && (
        <Modal>
          <Content>
            <div>
              <ContentHeader>
                <span>Visualizar Admins</span>
              </ContentHeader>
              <h3>Administradores - {currentUnity.name}</h3>
              <Table
                itemList={currentUnity.admins}
                columnList={['Nome']}
                attributeList={(admin) => [admin.fullName]}
                actionList={removeAdminsActions}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  setSeeAdminsModalOpen(false);
                }}
                background="rgb(222,83,83)"
                text={'Voltar'}
              />
            </div>
          </Content>
        </Modal>
      )}
      {isAddAdminsModalOpen && (
        <Modal>
          <Content>
            <div>
              <ContentHeader>
                <span>Adicionar Admins</span>
              </ContentHeader>
              <h3>Administradores - {currentUnity.name}</h3>
              <TextInput
                set={setAdminSearchName}
                value={adminSearchName}
                placeholder="Nome do usuário"
              />
              <Table
                itemList={filterUsers()}
                columnList={['Nome']}
                attributeList={(admin) => [admin.fullName]}
                actionList={newAdminActions}
              />
            </div>

            <div>
              <Button onClick={() => searchUsers()}>Buscar</Button>
              <div>
                <Button
                  onClick={() => {
                    setAddAdminsModalOpen(false);
                  }}
                  background="rgb(222,83,83)"
                  text={'Voltar'}
                />
              </div>
            </div>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Unidades;
