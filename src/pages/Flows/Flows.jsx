import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react';

import api from 'services/api';
import userApi from 'services/user';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import EyeIcon from '@mui/icons-material/Visibility';
import AddSequenceInFlow from 'components/Flow/AddSequenceInFlow';
import {
  Container,
  AddFlowButton,
  Area,
  Modal,
  Content,
  ContentHeader,
  CloseModalGeneral,
  LabelDiv,
  DivFlex
} from './styles';
import FlowViewer from 'components/Flow/FlowViewer';
import Table from 'components/Tables/Table';
import hasPermission from 'util/permissionChecker';
import SelectionList from 'components/Flow/SelectionList';

function Flows() {
  const [flowList, setFlowList] = useState([]);
  const [users, setUsers] = useState([]);
  const [stages, setStages] = useState([]);

  const [flowId, setFlowId] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flowStages, setFlowStages] = useState([]);
  const [flowUsers, setFlowUsers] = useState([]);
  const [flowSequences, setFlowSequences] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    updateStages();
    updateFlows();
    updateUsers();
  }, []);

  async function updateFlows() {
    const response = await api.get('/flows');
    setFlowList(response.data);
  }

  async function updateUsers() {
    const response = await userApi.get('/allUser');
    setUsers(response.data);
  }

  async function updateStages() {
    const response = await api.get('/stages');
    setStages(response.data);
  }

  const responseHandler = useCallback((response, successMsg, errorMsg) => {
    if (response.status == 200) {
      toast.success(successMsg);
      updateFlows();
    } else {
      toast.error(errorMsg);
    }
  }, []);

  function handleError(e) {
    if (e.response.status == 401) {
      toast(e.response.data.message, {
        icon: '⚠️',
        duration: 3000
      });
    } else {
      toast.error('Não foi possível executar a ação');
    }
  }

  const addFlow = useCallback(async () => {
    const { idUnit } = JSON.parse(localStorage.getItem('user'));
    setModalOpen(!isModalOpen);
    try {
      const response = await api.post('/newFlow', {
        name: flowName,
        stages: flowStages,
        sequences: flowSequences,
        idUsersToNotify: flowUsers,
        idUnit
      });
      responseHandler(
        response,
        'Fluxo Adicionado com sucesso',
        'Erro ao adicionar fluxo'
      );
    } catch (e) {
      handleError(e);
    }
  }, [
    isModalOpen,
    flowName,
    flowStages,
    flowSequences,
    flowUsers,
    responseHandler
  ]);

  const editFlow = useCallback(async () => {
    setShowFlow(!showFlow);
    try {
      const newSequences = flowSequences.filter((sequence) => {
        return flowStages.includes(sequence.from) &&
          flowStages.includes(sequence.to)
          ? true
          : false;
      });
      setFlowSequences(newSequences);

      const response = await api.put('/flow', {
        idFlow: flowId,
        name: flowName,
        stages: flowStages,
        sequences: flowSequences,
        idUsersToNotify: flowUsers
      });
      responseHandler(
        response,
        'Fluxo Editado com sucesso',
        'Erro ao Editar fluxo'
      );
    } catch (e) {
      handleError(e);
    }
  }, [
    flowId,
    flowName,
    flowSequences,
    flowStages,
    flowUsers,
    responseHandler,
    showFlow
  ]);

  const deleteFlow = useCallback(
    async (id) => {
      try {
        const response = await api.delete(`/flow/${id}`);
        responseHandler(
          response,
          'Fluxo Deletada com sucesso',
          'Erro ao deletar fluxo'
        );
      } catch (e) {
        handleError(e);
      }
    },
    [responseHandler]
  );

  const addSequence = useCallback(
    ({ value: from }, { value: to }) => {
      if (
        flowSequences.find(
          (sequence) => sequence.from == from && sequence.to == to
        )
      ) {
        return toast.error('Sequencia já existe');
      } else if (from == to) {
        return toast.error('Origem e destino não podem ser iguais');
      }
      setFlowSequences([...flowSequences, { from, to }]);
    },
    [flowSequences]
  );

  const removeSequence = useCallback(() => {
    setFlowSequences(flowSequences.slice(0, -1));
  }, [flowSequences]);

  function getFlow(flowId) {
    return flowList.find((flow) => flow.idFlow == flowId);
  }

  function buildFlow({ idFlow, name, stages, sequences, users }) {
    setFlowId(idFlow || '');
    setFlowName(name || '');
    setFlowStages(stages || []);
    setFlowSequences(sequences || []);
    setFlowUsers(users || []);
  }

  const actionList = [
    {
      tooltip: 'Visualizar processos',
      linkTo: '/processes',
      linkIcon: <EyeIcon htmlColor="black" />,
      type: 'link',
      disabled: !hasPermission(user, 'view-flow')
    },
    {
      tooltip: 'Editar fluxo',
      action: (flow) => {
        buildFlow(flow);
        setShowFlow(!showFlow);
      },
      type: 'edit',
      disabled: !hasPermission(user, 'edit-flow')
    },
    {
      tooltip: 'Deletar fluxo',
      action: (flow) => {
        setDeleteModal(!deleteModal);
        setSelectedFlow(flow.idFlow);
      },
      type: 'delete',
      disabled: !hasPermission(user, 'delete-flow')
    }
    /*,
    {
      tooltip: 'Visualizar estatísticas',
      linkTo: '/statistics',
      linkIcon: <InsertChartIcon htmlColor="black" />,
      type: 'link'
    }*/
  ];

  const getAttributesForDisplay = useCallback((flow) => [flow.name], []);

  const handleAddFlow = useCallback(() => {
    buildFlow({});
    setShowFlow(!showFlow);
  }, [showFlow]);

  const clearFlowModal = useCallback(() => {
    buildFlow({});
    setModalOpen(!isModalOpen);
  }, [setModalOpen, isModalOpen]);

  const handleDeleteFlow = useCallback(() => {
    deleteFlow(selectedFlow);
    setDeleteModal(!deleteModal);
  }, [selectedFlow, deleteFlow, deleteModal]);

  const handleDeleteModal = useCallback(() => {
    setDeleteModal(!deleteModal);
  }, [deleteModal]);

  const handleNewFlowModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleShowFlowModal = useCallback(() => {
    setShowFlow(!showFlow);
  }, [showFlow]);

  return (
    <>
      <Container>
        <h1>Fluxos</h1>
        <AddFlowButton
          onClick={handleNewFlowModal}
          data-testid="closeAddModal"
          disabled={!hasPermission(user, 'create-flow')}
        >
          <span>+ Adicionar Fluxo</span>
        </AddFlowButton>
        <Area>
          <Table
            columnList={['Nome']}
            itemList={flowList}
            attributeList={getAttributesForDisplay}
            actionList={actionList}
          />
        </Area>
        {/* {Modal para confirmar exclusão do fluxo} */}
        {deleteModal && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Excluir Fluxo</span>
              </ContentHeader>
              <span>Deseja realmente excluir este Fluxo?</span>
              {getFlow(selectedFlow)?.name}
              <div>
                <Button onClick={handleDeleteFlow} text={'Confirmar'} />
                <Button
                  onClick={handleDeleteModal}
                  background="#DE5353"
                  text={'Cancelar'}
                />
              </div>
            </Content>
          </Modal>
        )}
        {/* Modal de editar fluxo */}
        {showFlow && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Editar fluxo</span>
                <CloseModalGeneral
                  onClick={handleAddFlow}
                  data-testid="closeEditModal"
                />
              </ContentHeader>
              <LabelDiv>
                <label>Nome</label>
                <TextInput
                  set={setFlowName}
                  value={flowName}
                  maxLength={40}
                  data-testid="flowName"
                  placeholder="Nome do fluxo"
                />
              </LabelDiv>
              <DivFlex>
                <SelectionList
                  label="Etapas do Fluxo"
                  placeholder="Selecione uma etapa"
                  options={stages}
                  selectedOptions={flowStages}
                  selectedOptionsId={'idStage'}
                  selectedOptionsName={'name'}
                  addSelectedOption={setFlowStages}
                  hintText="Etapas presentes em um fluxo"
                />
                <SelectionList
                  label="Usuários Notificados"
                  placeholder="Selecione o usuário"
                  options={users}
                  selectedOptions={flowUsers}
                  selectedOptionsId={'cpf'}
                  selectedOptionsName={'fullName'}
                  addSelectedOption={setFlowUsers}
                  hintText="Usuários notificados por email, quando processos deste fluxo estiverem atrasado."
                />
              </DivFlex>
              <span>Sequências</span>
              {flowStages.length > 1 && (
                <AddSequenceInFlow
                  addSequence={addSequence}
                  removeSequence={removeSequence}
                  options={flowStages}
                  stages={stages}
                />
              )}
              <FlowViewer
                flow={{
                  name: flowName,
                  stages: flowStages,
                  sequences: flowSequences,
                  users: flowUsers
                }}
                disabled={true}
                stages={stages || []}
              />
              <div>
                <Button onClick={() => editFlow()} text={'Salvar'} />
                <Button
                  onClick={handleShowFlowModal}
                  background="#DE5353"
                  text={'Cancelar'}
                />
              </div>
            </Content>
          </Modal>
        )}
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Novo Fluxo</span>
              <CloseModalGeneral onClick={clearFlowModal} />
            </ContentHeader>

            <LabelDiv>
              <label>Nome</label>
              <TextInput
                set={setFlowName}
                value={flowName}
                maxLength={40}
                placeholder="Nome do fluxo"
              />
            </LabelDiv>
            <DivFlex>
              <SelectionList
                label="Etapas do Fluxo"
                placeholder="Selecione uma etapa"
                options={stages}
                selectedOptions={flowStages}
                selectedOptionsId={'idStage'}
                selectedOptionsName={'name'}
                addSelectedOption={setFlowStages}
                hintText="Etapas presentes em um fluxo"
              />
              <SelectionList
                label="Usuários Notificados"
                placeholder="Selecione o usuário"
                options={users}
                selectedOptions={flowUsers}
                selectedOptionsId={'cpf'}
                selectedOptionsName={'fullName'}
                addSelectedOption={setFlowUsers}
                hintText="Usuários notificados por email, quando processos deste fluxo estiverem atrasado."
              />
            </DivFlex>
            {flowStages.length > 1 && (
              <>
                <span>Sequências</span>
                <AddSequenceInFlow
                  addSequence={addSequence}
                  removeSequence={removeSequence}
                  options={flowStages}
                  stages={stages}
                />
              </>
            )}
            <FlowViewer
              flow={{
                name: flowName,
                stages: flowStages,
                sequences: flowSequences,
                users: flowUsers
              }}
              disabled={true}
              stages={stages || []}
            />
            <div>
              <Button
                onClick={() => {
                  addFlow();
                }}
                text={'Salvar'}
              />
              <Button
                onClick={handleNewFlowModal}
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

export default Flows;
