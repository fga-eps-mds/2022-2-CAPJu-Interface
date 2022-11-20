import React from 'react';
import toast from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import AxiosError from 'axios/lib/core/AxiosError';
import { DeleteForever } from '@styled-icons/material';

import {
  Container,
  AddStageButton,
  Area,
  Modal,
  Content,
  Table,
  ContentHeader
} from './styles';
import api from 'services/api';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

function Stages() {
  const [stages, setStages] = useState([{ name: '', time: '', _id: '' }]);
  const [stageName, setStageName] = useState('');
  const [stageTime, setStageTime] = useState('');
  const [currentStage, setCurrentStage] = useState({ name: '', _id: '' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalConfDelete, setModalConfDelete] = useState(false);

  useEffect(() => {
    updateStages();
  }, []);

  async function updateStages() {
    const response = await api.get('/stages');
    console.log(response.data.Stages);
    function compara(a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
    response.data.Stages.sort(compara);
    setStages(response.data.Stages);
  }

  async function addStage() {
    console.log(stageTime);
    try {
      const response = await api.post('/newStage', {
        name: stageName,
        time: stageTime
      });

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
        console.log(e);
        toast.error('Erro ao adicionar a etapa');
      }
      if (e instanceof AxiosError) toast.error('Etapa já existe');
    }
  }

  async function deleteStage(id) {
    try {
      const response = await api.post('/deleteStage', {
        stageId: id
      });
      if (response.status == 200) {
        toast.success('Etapa Deletada com sucesso');
        updateStages();
      }
    } catch (e) {
      console.log(e);
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

  return (
    <>
      <Container>
        <h1>Etapas</h1>
        <Area>
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage, index) => {
                return (
                  <tr key={index}>
                    <td>{stage.name}</td>
                    <td>{stage.time}</td>
                    <td>
                      <Tooltip title="Deletar etapa">
                        <DeleteForever
                          className="delete-icon"
                          size={30}
                          onClick={() => {
                            setModalConfDelete(true);
                            setCurrentStage(stage);
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
        <AddStageButton
          onClick={() => {
            setModalOpen(true);
          }}
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
              <p> Nome </p>

              <TextInput
                set={setStageName}
                value={stageName}
                placeholder="Nome da etapa"
              ></TextInput>
              <p> Duração </p>

              <TextInput
                set={setStageTime}
                value={stageTime}
                placeholder="Duração (dias)"
              ></TextInput>
            </div>

            <div>
              <Button
                onClick={() => {
                  addStage();
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
                  deleteStage(currentStage._id);
                  setModalConfDelete(false);
                }}
              >
                Excluir
              </Button>
              <Button
                onClick={() => {
                  setModalConfDelete(false);
                }}
                background="red"
              >
                Cancelar
              </Button>
            </div>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Stages;
