import toast from 'react-hot-toast';
import { Eye } from '@styled-icons/entypo';
import Tooltip from '@mui/material/Tooltip';
import { UserPlus } from '@styled-icons/fa-solid';
import React, { useEffect, useState } from 'react';
import AxiosError from 'axios/lib/core/AxiosError';
import { DeleteForever } from '@styled-icons/material';

import {
  Container,
  AddUnityButton,
  Area,
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
  const [unitList, setUnitList] = useState([{ name: '', time: '', _id: '' }]);
  const [UnityName, setUnityName] = useState('');
  const [adminSearchName, setAdminSearchName] = useState('');
  const [currentUnity, setCurrentUnity] = useState({
    name: '',
    _id: '',
    admins: []
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSeeAdminsModalOpen, setSeeAdminsModalOpen] = useState(false);
  const [isAddAdminsModalOpen, setAddAdminsModalOpen] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    updateUnitys();
  }, []);

  async function searchUsers(name) {
    const response = await userApi.get('searchUsers/' + name);
    setFoundUsers(response.data.user);
  }

  async function setAdmin(userId) {
    const response = await userApi.post('setUnityAdmin/', {
      unityId: currentUnity._id,
      userId
    });
    if (response.status == 200) {
      toast.success('Administrador de unidade adicionado com sucesso');
    }
  }

  async function updateUnityAdmins(unit) {
    const response = await api.get('unityAdmins/' + unit._id);
    let existingUnity = { ...unit };
    existingUnity.admins = response.data.admins || [];
    setCurrentUnity(existingUnity);
  }

  async function removeAdmin(adminId) {
    const response = await userApi.post('/removeUnityAdmin', {
      unityId: currentUnity._id,
      adminId: adminId
    });
    if (response.status == 200) {
      toast.success('Administrador removido com sucesso');
    }
  }

  async function updateUnitys() {
    const response = await api.get('/unitys');
    setUnitList(response.data.Unitys);
  }

  async function addUnity() {
    try {
      const response = await api.post('/newUnity', {
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

  async function addAdminModal(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    await searchUsers(adminSearchName);
    console.log(foundUsers);
    setAddAdminsModalOpen(true);
  }

  async function showAdminsModal(unit) {
    setCurrentUnity({ ...unit, admins: [] });
    await updateUnityAdmins(unit);
    setSeeAdminsModalOpen(true);
  }

  function renderActions(unit) {
    return (
      <>
        <Tooltip title="Visualizar Admins">
          <Eye onClick={() => showAdminsModal(unit)} />
        </Tooltip>
        <Tooltip title="Adicionar Admins">
          <UserPlus onClick={() => addAdminModal(unit)} />
        </Tooltip>
      </>
    );
  }

  function removeAdmins(admin) {
    return (
      <Tooltip title="Remover Admin">
        <DeleteForever onClick={() => removeAdmin(admin._id)} />
      </Tooltip>
    );
  }

  function newAdmin(user) {
    return (
      <Tooltip title="Adicionar como Admin">
        <UserPlus
          onClick={() => {
            setAddAdminsModalOpen(true);
            setAdmin(user._id);
          }}
        />
      </Tooltip>
    );
  }

  return (
    <>
      <Container>
        <h1>Unidades</h1>
        <Area>
          <Table
            itemList={unitList}
            actions={renderActions}
            columnList={['Nome']}
            attributeList={(unit) => [unit.name]}
          />
        </Area>
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
              <p> Nome </p>

              <TextInput
                set={setUnityName}
                value={UnityName}
                placeholder="Nome da unidade"
              ></TextInput>
            </div>

            <div>
              <Button
                onClick={() => {
                  addUnity();
                  setModalOpen(false);
                }}
              >
                Salvar
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                background="#DE5353"
              >
                Cancelar
              </Button>
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
                attributeList={(admin) => [admin.name]}
                actions={removeAdmins}
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  setSeeAdminsModalOpen(false);
                }}
                background="rgb(222,83,83)"
              >
                Voltar
              </Button>
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
              ></TextInput>
              <Table
                itemList={foundUsers}
                columnList={['Nome']}
                attributeList={(admin) => [admin.name]}
                actions={newAdmin}
              />
            </div>

            <div>
              <div>
                <Button
                  onClick={() => {
                    searchUsers(adminSearchName);
                  }}
                >
                  Buscar
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setAddAdminsModalOpen(false);
                  }}
                  background="rgb(222,83,83)"
                >
                  Voltar
                </Button>
              </div>
            </div>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Unidades;
