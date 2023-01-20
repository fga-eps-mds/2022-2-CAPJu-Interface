import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    updateUnitys();
  }, []);

  async function searchUsers(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    const response = await userApi.get('users');
    setFoundUsers(response.data.users);
    setAddAdminsModalOpen(true);
  }

  // TODO: _id?
  async function setAdmin({ _id: userId }) {
    setAddAdminsModalOpen(true);
    const response = await userApi.put('setUnitAdmin/', {
      idUnit: currentUnity.idUnit,
      cpf: userId
    });
    if (response.status == 200) {
      toast.success('Administrador de unidade adicionado com sucesso');
    }
  }

  async function updateUnityAdmins(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    const response = await api.get('unitAdmins/' + unit.idUnit);
    let existingUnity = { ...unit };
    existingUnity.admins = response.data.admins || [];
    setCurrentUnity(existingUnity);
    setSeeAdminsModalOpen(true);
  }

  async function removeAdmin(adminId) {
    const response = await userApi.post('/removeUnityAdmin', {
      unityId: currentUnity.idUnit,
      adminId: adminId
    });
    if (response.status == 200) {
      toast.success('Administrador removido com sucesso');
      updateUnityAdmins(currentUnity);
    }
  }

  async function updateUnitys() {
    const response = await api.get('/units');
    setUnitList(response.data.units);
  }

  function filterUsers() {
    return foundUsers.filter(
      (user) =>
        user.fullName.includes(adminSearchName) &&
        !(user.idUnit === currentUnity.idUnit)
    );
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
      tooltip: 'Remover Admin',
      action: (user) => removeAdmin(user._id),
      type: 'delete'
    }
  ];
  const unitListActions = [
    { tooltip: 'Visualizar Admins', action: updateUnityAdmins, type: 'eye' },
    { tooltip: 'Adicionar Admins', action: searchUsers, type: 'addUser' }
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
            setModalOpen(true);
          }}
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
