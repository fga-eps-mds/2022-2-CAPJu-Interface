import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useState } from 'react';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';

import api from 'services/api';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import StagesInFlow from 'components/StagesInFlow/StagesInFlow';
import AddStageInFlow from 'components/AddStageInFlow/AddStageInFlow';
import DescriptionIcon from '@mui/icons-material/Description';
import AddSequenceInFlow from 'components/AddSequenceInFlow/AddSequenceInFlow';
import {
  Container,
  AddFlowButton,
  Area,
  Modal,
  Content,
  SelectorWrapper,
  StageName,
  SequencesWrapper,
  SequenceItem,
  ContentHeader,
  CloseModalGeneral
} from './styles';
import FlowViewer from 'components/FlowViewer/FlowViewer';
import Table from 'components/Tables/Table';

function Flows() {
  const [flows, setFlows] = useState([]);
  const [selectedStage, setSelectedStage] = useState('1');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [stages, setStages] = useState([]);

  const [newFlow, setNewFlow] = useState({
    name: '',
    stages: [],
    sequences: []
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState(0);

  useEffect(() => {
    updateStages();
    updateFlows();
  }, []);

  async function updateFlows() {
    const response = await api.get('/flows');
    setFlows(response.data.Flows);
  }

  async function updateStages() {
    const response = await api.get('/stages');
    setStages(response.data.Stages);
    setSelectedStage(response.data.Stages[0]?._id);
  }

  const responseHandler = useCallback((response, successMsg, errorMsg) => {
    if (response.status == 200) {
      toast.success(successMsg);
      updateFlows();
    } else {
      toast.error(errorMsg);
    }
  }, []);

  const addFlow = useCallback(async () => {
    setModalOpen(!isModalOpen);
    try {
      const response = await api.post('/newFlow', {
        ...newFlow
      });
      responseHandler(
        response,
        'Fluxo Adicionado com sucesso',
        'Erro ao adicionar fluxo'
      );
    } catch (e) {
      if (e.response.status == 401) {
        toast(e.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao adicionar fluxo');
      }
    }
  }, [isModalOpen, newFlow, responseHandler]);

  const deleteFlow = useCallback(
    async (id) => {
      try {
        const response = await api.post('/deleteFlow', {
          flowId: id
        });
        responseHandler(
          response,
          'Fluxo Deletada com sucesso',
          'Erro ao deletar fluxo'
        );
      } catch (e) {
        if (e.response.status == 401) {
          toast(e.response.data.message, {
            icon: '⚠️',
            duration: 3000
          });
        } else {
          toast.error('Erro ao remover fluxo');
        }
      }
    },
    [responseHandler]
  );

  const editFlow = useCallback(
    async (id) => {
      setShowFlow(!showFlow);
      try {
        let editedFlow = { ...newFlow };

        let newSequences = editedFlow.sequences.filter((sequence) => {
          return editedFlow.stages.includes(sequence.from) &&
            editedFlow.stages.includes(sequence.to)
            ? true
            : false;
        });

        editedFlow.sequences = newSequences;
        delete editedFlow.createdAt;
        delete editedFlow.updatedAt;
        delete editedFlow.__v;
        delete editedFlow.unity;

        const response = await api.put('/editFlow', {
          _id: id,
          ...editedFlow
        });
        responseHandler(
          response,
          'Fluxo Editado com sucesso',
          'Erro ao Editar fluxo'
        );
      } catch (e) {
        if (e.response.status == 401) {
          toast(e.response.data.message, {
            icon: '⚠️',
            duration: 3000
          });
        } else {
          toast.error('Erro ao Editar fluxo');
        }
      }
    },
    [newFlow, responseHandler, showFlow]
  );

  const updateFlowName = useCallback(
    (newName) => {
      let tmp = { ...newFlow };
      tmp.name = newName;
      setNewFlow(tmp);
    },
    [newFlow]
  );

  const addStage = useCallback(
    (flow) => {
      let tmp = { ...flow };
      tmp.stages.push(selectedStage);
      setNewFlow(tmp);
    },
    [selectedStage]
  );

  const addSequence = useCallback(() => {
    let tmp = { ...newFlow };
    tmp.sequences.push({ from, to });
    setNewFlow(tmp);
  }, [from, newFlow, to]);

  const removeSequence = useCallback(() => {
    let tmp = { ...newFlow };
    tmp.sequences.pop();
    setNewFlow(tmp);
  }, [newFlow]);

  const allOptions = stages.map((stage) => {
    return { label: <>{stage.name}</>, value: stage._id };
  });

  const selectedOptions = stages
    .filter((stage) => {
      return newFlow.stages.includes(stage._id);
    })
    .map((stage) => {
      return { label: <>{stage.name}</>, value: stage._id };
    });

  function getFlow(flowId) {
    return flows.find((flow) => flow._id == flowId);
  }

  const actionList = [
    {
      tooltip: 'Visualizar processos',
      linkTo: '/processes',
      linkIcon: <DescriptionIcon htmlColor="black" />,
      type: 'link'
    },
    {
      tooltip: 'Editar fluxo',
      action: (flow) => {
        setShowFlow(!showFlow);
        setNewFlow(getFlow(flow._id));
      },
      type: 'edit'
    },
    {
      tooltip: 'Deletar fluxo',
      action: (flow) => {
        setDeleteModal(!deleteModal);
        setSelectedFlow(flow._id);
      },
      type: 'delete'
    }
    /*,
    {
      tooltip: 'Visualizar estatísticas',
      linkTo: '/statistics',
      linkIcon: <InsertChartIcon htmlColor="black" />,
      type: 'link'
    }*/
  ];

  const handleAddFlow = useCallback(() => {
    setShowFlow(!showFlow);
    setNewFlow({
      name: '',
      stages: [],
      sequences: []
    });
  }, [showFlow]);

  const handleDeleteFlow = useCallback(() => {
    deleteFlow(selectedFlow);
    setDeleteModal(!deleteModal);
  }, [selectedFlow, deleteFlow, deleteModal]);

  const getAttributesForDisplay = useCallback((flow) => [flow.name], []);

  const handleDeleteModal = useCallback(() => {
    setDeleteModal(!deleteModal);
  }, [deleteModal]);

  const handleNewFlowModal = useCallback(() => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleShowFlowModal = useCallback(() => {
    setShowFlow(!showFlow);
  }, [showFlow]);

  const clearFlowModal = useCallback(() => {
    setNewFlow({
      name: '',
      stages: [],
      sequences: []
    });
    setModalOpen(!isModalOpen);
  }, [setNewFlow, setModalOpen, isModalOpen]);

  return (
    <>
      <Container>
        <h1>Fluxos</h1>
        <Area>
          <Table
            columnList={['Nome']}
            itemList={flows}
            attributeList={getAttributesForDisplay}
            actionList={actionList}
          />
        </Area>
        <AddFlowButton onClick={handleNewFlowModal}>
          <span>+ Adicionar Fluxo</span>
        </AddFlowButton>
        {/* {Modal para confirmar exclusão do fluxo} */}
        {deleteModal && (
          <Modal>
            <Content>
              <ContentHeader>
                {' '}
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
        {showFlow && newFlow && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Editar fluxo</span>
                <CloseModalGeneral onClick={handleAddFlow} />
              </ContentHeader>
              <TextInput
                label="Nome"
                set={updateFlowName}
                value={newFlow.name}
                maxLength={40}
                data-testid={'flowName'}
              />
              <label>
                <span>Etapas</span>
                <AddStageInFlow
                  selectedStage={selectedStage}
                  setSelectedStage={setSelectedStage}
                  options={allOptions}
                  onClick={addStage}
                  flow={newFlow}
                />
              </label>
              <StagesInFlow
                flow={newFlow}
                stageList={stages}
                setNewFlow={setNewFlow}
              />
              <FlowViewer
                flow={newFlow}
                disabled={true}
                stages={stages || []}
              />
              {newFlow.stages.length > 0 && (
                <>
                  <>Sequências</>
                  <SelectorWrapper>
                    <AddSequenceInFlow
                      value={from}
                      setValue={setFrom}
                      options={selectedOptions}
                    />
                    <ArrowRight size={25} />
                    <AddSequenceInFlow
                      value={to}
                      setValue={setTo}
                      options={selectedOptions}
                    />
                    <Button
                      buttonType={'add'}
                      onClick={addSequence}
                      text={'Adicionar'}
                    />
                  </SelectorWrapper>
                  <Button
                    background="#de5353"
                    onClick={removeSequence}
                    text={'Retroceder'}
                  />
                </>
              )}
              <Button onClick={editFlow} text={'Salvar'} />
              <Button
                onClick={handleShowFlowModal}
                background="#DE5353"
                text={'Cancelar'}
              />
            </Content>
          </Modal>
        )}
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Novo Fluxo</span>
              <CloseModalGeneral onClick={clearFlowModal} data-testid="close" />
            </ContentHeader>
            <TextInput
              placeholder={'Nome do fluxo'}
              set={updateFlowName}
              value={newFlow.name}
              maxLength={40}
            />
            <span>Etapas</span>
            <AddStageInFlow
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
              options={allOptions}
              onClick={addStage}
              flow={newFlow}
            />
            <StagesInFlow
              flow={newFlow}
              stageList={stages}
              setNewFlow={setNewFlow}
            />
            {newFlow.stages.length > 0 && (
              <>
                <>Sequências</>
                <SelectorWrapper>
                  <AddSequenceInFlow
                    value={from}
                    setValue={setFrom}
                    options={selectedOptions}
                  />
                  <ArrowRight size={25} />
                  <AddSequenceInFlow
                    value={to}
                    setValue={setTo}
                    options={selectedOptions}
                  />
                  <div className="addStage" onClick={addSequence}>
                    <Button buttonType={'add'} text={'Adicionar'} />
                  </div>
                </SelectorWrapper>
                <SequencesWrapper>
                  {newFlow.sequences.map((sequence) => {
                    return (
                      <SequenceItem key={sequence.id}>
                        <StageName>
                          {
                            stages.find((stage) => {
                              return sequence.from == stage._id;
                            }).name
                          }
                        </StageName>
                        <ArrowRight size={25} />
                        <StageName>
                          {
                            stages.find((stage) => {
                              return sequence.to == stage._id;
                            }).name
                          }
                        </StageName>
                      </SequenceItem>
                    );
                  })}
                </SequencesWrapper>
              </>
            )}
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
