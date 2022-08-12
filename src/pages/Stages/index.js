import api from '../../services/api';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Container,
  AddStageButton,
  StagesArea,
  StageItem,
  Modal,
  Content
} from './styles';
import { DeleteForever } from '@styled-icons/material';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

const closeBtn = {
  alignSelf: 'flex-end'
}

function Login() {
  const [stages, setStages] = useState([
    { name: 'stage 1' },
    { name: 'stage 2' }
  ]);
  const [stageName, setStageName] = useState('');
  const [stageTime, setStageTime] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    updateStages();
  }, []);

  async function updateStages() {
    const response = await api.get('/stages');
    console.log(response);
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
      console.log(e);
      toast.error('Erro ao adicionar a etapa');
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
      } else {
        toast.error('Erro ao deletar a etapa');
      }
    } catch (e) {
      console.log(e);
      toast.error('Erro ao remover a etapa');
    }
  }

  return (
    <>
      <Container>
        Etapas
        <StagesArea>
          {stages.map((stage, index) => {
            return (
              <StageItem key={index}>
                {stage.name}{' '}
                <DeleteForever
                  size={30}
                  onClick={() => {
                    deleteStage(stage._id);
                  }}
                />
              </StageItem>
            );
          })}
        </StagesArea>
        <AddStageButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          + Adicionar Etapa
        </AddStageButton>
        <></>
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
              <CloseOutline 
                style={closeBtn} 
                onClick={() => {
                setModalOpen(false);
            }}></CloseOutline>
            <h2>Nova Etapa</h2>
            <TextInput set={setStageName} value={stageName} placeholder='Nome da etapa'></TextInput>
            <TextInput set={setStageTime} value={stageTime} placeholder='Duração (dias)'></TextInput>
            <Button
              onClick={() => {
                addStage();
                setModalOpen(false);
              }}
            >
              Salvar
            </Button>
          </Content>
        </Modal>
      )}
    </>
  );
}

export default Login;
