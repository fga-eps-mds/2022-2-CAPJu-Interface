import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import AxiosError from 'axios/lib/core/AxiosError';

import {
  Container,
  AddStageButton,
  Area,
  Modal,
  Content,
  ContentHeader
} from './styles';
import api from 'services/api';
import Table from 'components/Tables/Table';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import hasPermission from 'util/permissionChecker';

function Stages() {
  const [stages, setStages] = useState([
    { name: '', duration: '', idStage: '' }
  ]);
  const [stageName, setStageName] = useState('');
  const [stageTime, setStageTime] = useState('');
  const [currentStage, setCurrentStage] = useState({ name: '', idStage: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalConfDelete, setModalConfDelete] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    updateStages();
  }, []);

  async function updateStages() {
    const response = await api.get('/stages');
    function compara(a, b) {
      if (a.duration > b.duration) return a.name > b.name ? 1 : 0;
      return -1;
    }
    response.data.Stages.sort(compara);
    setStages(response.data.Stages);
  }

  async function addStage() {
    try {
      const cpf = JSON.parse(localStorage.getItem('user')).cpf;
      const userBody = { cpf: cpf };
      const user = await api.get(`/user/${cpf}`);
      const body = {
        name: stageName,
        duration: stageTime,
        idUnit: user.data.idUnit
      };
      const response = await api.post('/newStage', body);

      if (response.status == 200) {
        toast.success('Etapa Adicionada com sucesso');
        updateStages();
      } else {
        toast.error('Erro ao adicionar a etapa');
      }
    } catch (e) {
      if (e.response.status == 401) {
        toast(e.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao adicionar a etapa');
      }
      if (e instanceof AxiosError) toast.error('Etapa já existe');
    }
  }

  async function deleteStage(id) {
    try {
      const response = await api.delete(`/deleteStage/${id}`);
      if (response.status == 200) {
        toast.success('Etapa Deletada com sucesso');
        updateStages();
      }
    } catch (e) {
      if (e.response.status == 401) {
        toast(e.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao deletar a etapa');
      }
    }
  }

  const actionList = [
    {
      tooltip: 'Deletar etapa',
      action: (stage) => {
        setModalConfDelete(true);
        setCurrentStage(stage);
      },
      type: 'delete',
      disabled: !hasPermission(user, 'delete-stage')
    }
  ];

  const columnHeaders = ['Nome', 'Duração'];
  return (
    <>
      <Container>
        <h1>Etapas</h1>
        <Area>
          <Table
            columnList={columnHeaders}
            itemList={stages}
            actionList={actionList}
            attributeList={(stage) => [stage.name, stage.duration]}
          />
        </Area>

        <AddStageButton
          onClick={() => setModalOpen(true)}
          disabled={!hasPermission(user, 'create-stage')}
        >
          + Adicionar Etapa
        </AddStageButton>
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Criar Etapa</span>
            </ContentHeader>
            <div>
              <TextInput
                label="Nome"
                set={setStageName}
                value={stageName}
                placeholder="Nome da etapa"
              />
              <TextInput
                label="Duração"
                set={setStageTime}
                value={stageTime}
                placeholder="Duração (dias)"
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  addStage();
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
      {isModalConfDelete && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Excluir Etapa</span>
            </ContentHeader>
            {currentStage.name}
            <h3>Deseja excluir esta etapa?</h3>
            <div>
              <Button
                onClick={() => {
                  deleteStage(currentStage.idStage);
                  setModalConfDelete(false);
                }}
                text={'Excluir'}
              />
              <Button
                onClick={() => {
                  setModalConfDelete(false);
                }}
                background="#DE5353"
                text={'Cancelar'}
              />
            </div>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Stages;
