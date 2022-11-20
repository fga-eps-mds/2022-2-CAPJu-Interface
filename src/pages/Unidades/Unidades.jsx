import React from 'react';
import toast from 'react-hot-toast';
import { Eye } from '@styled-icons/entypo';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { UserPlus } from '@styled-icons/fa-solid';
import AxiosError from 'axios/lib/core/AxiosError';
import { DeleteForever } from '@styled-icons/material';

import {
  Container,
  AddUnityButton,
  Area,
  Modal,
  Content,
  Table,
  ContentHeader
} from './styles';
import api from 'services/api';
import userApi from 'services/user';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

function Unidades() {
  const [Unitys, setUnitys] = useState([{ name: '', time: '', _id: '' }]);
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

  async function updateUnityAdmins() {
    console.log(currentUnity._id);
    const response = await api.get('unityAdmins/' + currentUnity._id);
    let existingUnity = { ...currentUnity };
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
    console.log(response.data.Unitys);
    setUnitys(response.data.Unitys);
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
        console.log(e);
        toast.error('Erro ao adicionar a unidade');
      }
      if (e instanceof AxiosError) toast.error('Unidade já existe');
    }
  }

  return (
    <>
      <Container>
        <h1>Unidades</h1>
        <Area>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Unitys.map((unity, index) => {
                return (
                  <tr key={index}>
                    <td>{unity.name}</td>
                    <td>
                      <Tooltip title="Visualizar Admins">
                        <Eye
                          className="delete-icon"
                          size={30}
                          onClick={() => {
                            setSeeAdminsModalOpen(true);
                            setCurrentUnity({ ...unity, admins: [] });
                            updateUnityAdmins();
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Adicionar Admins">
                        <UserPlus
                          className="delete-icon"
                          size={30}
                          onClick={() => {
                            setAddAdminsModalOpen(true);
                            setCurrentUnity({ ...unity, admins: [] });
                            updateUnityAdmins();
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
                background="red"
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
              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUnity.admins.map((admin, index) => {
                    return (
                      <tr key={index}>
                        <td>{admin.name}</td>
                        <td>
                          <Tooltip title="Adicionar Admins">
                            <DeleteForever
                              className="delete-icon"
                              size={30}
                              onClick={() => {
                                setSeeAdminsModalOpen(false);
                                removeAdmin(admin._id);
                              }}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div>
              <Button
                onClick={() => {
                  setSeeAdminsModalOpen(false);
                }}
                background="red"
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

              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Adicionar</th>
                  </tr>
                </thead>
                <tbody>
                  {foundUsers.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>
                          <Tooltip title="Adicionar como Admin">
                            <UserPlus
                              className="delete-icon"
                              size={30}
                              onClick={() => {
                                setAddAdminsModalOpen(true);
                                setAdmin(user._id);
                              }}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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
                  background="red"
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
