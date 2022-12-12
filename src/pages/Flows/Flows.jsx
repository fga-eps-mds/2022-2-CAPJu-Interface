import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
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
import ButtonAdd from 'components/ButtonAdd/ButtonAdd';

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
  const [showFlow, setShowFlow] = useState(-1);
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

  function responseHandler(response, successMsg, errorMsg) {
    if (response.status == 200) {
      toast.success(successMsg);
      updateFlows();
    } else {
      toast.error(errorMsg);
    }
  }

  async function addFlow() {
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
  }

  async function deleteFlow(id) {
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
  }

  async function editFlow(id) {
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
  }

  function updateFlowName(newName) {
    let tmp = { ...newFlow };
    tmp.name = newName;
    setNewFlow(tmp);
  }

  function addStage(flow) {
    let tmp = { ...flow };
    tmp.stages.push(selectedStage);
    setNewFlow(tmp);
  }

  function addSequence() {
    let tmp = { ...newFlow };
    tmp.sequences.push({ from, to });
    setNewFlow(tmp);
  }
  function removeSequence() {
    let tmp = { ...newFlow };
    tmp.sequences.pop();
    setNewFlow(tmp);
  }
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
        setShowFlow(1);
        setNewFlow(getFlow(flow._id));
      },
      type: 'edit'
    },
    {
      tooltip: 'Deletar fluxo',
      action: (flow) => {
        setDeleteModal(true);
        setSelectedFlow(flow._id);
        setShowFlow(-1);
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

  return (
    <>
      <Container>
        <h1>Fluxos</h1>
        <Area>
          <Table
            columnList={['Nome']}
            itemList={flows}
            attributeList={(flow) => [flow.name]}
            actionList={actionList}
          />
        </Area>
        <AddFlowButton onClick={() => setModalOpen(true)}>
          <span>+ Adicionar Fluxo</span>
        </AddFlowButton>
        {/* {Modal para confirmar exclusão do fluxo} */}
        {deleteModal && (
          <>
            <Modal>
              <Content>
                <ContentHeader>
                  {' '}
                  <span>Excluir Fluxo</span>
                </ContentHeader>
                <span>Deseja realmente excluir este Fluxo?</span>
                {getFlow(selectedFlow).name}
                <div>
                  <Button
                    onClick={() => {
                      deleteFlow(selectedFlow);
                      setDeleteModal(false);
                    }}
                  >
                    Confirmar
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteModal(false);
                    }}
                    background="#DE5353"
                  >
                    Cancelar
                  </Button>
                </div>
              </Content>
            </Modal>
          </>
        )}
        {/* Modal de editar fluxo */}
        {showFlow != -1 && newFlow && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>Editar fluxo</span>
                <CloseModalGeneral
                  onClick={() => {
                    setShowFlow(-1);
                    setNewFlow({
                      name: '',
                      stages: [],
                      sequences: []
                    });
                  }}
                ></CloseModalGeneral>
              </ContentHeader>
              <span>Nome</span>
              <TextInput
                set={updateFlowName}
                value={newFlow.name}
                maxLength={40}
                data-testid="flowName"
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
              ></FlowViewer>
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
                    <ButtonAdd onClickProps={() => addSequence()} />
                  </SelectorWrapper>
                  <Button
                    background="#de5353"
                    onClick={() => {
                      removeSequence();
                    }}
                  >
                    <span>Retroceder</span>
                  </Button>
                </>
              )}
              <Button
                onClick={() => {
                  editFlow(showFlow);
                  setShowFlow(-1);
                }}
              >
                <span>Salvar</span>
              </Button>
              <Button
                onClick={() => {
                  setShowFlow(-1);
                }}
                background="#DE5353"
              >
                Cancelar
              </Button>
            </Content>
          </Modal>
        )}
      </Container>
      {isModalOpen && (
        <Modal>
          <Content>
            <ContentHeader>
              <span>Novo Fluxo</span>
              <CloseModalGeneral
                onClick={() => {
                  setNewFlow({
                    name: '',
                    stages: [],
                    sequences: []
                  });
                  setModalOpen(false);
                }}
                data-testid="close"
              />
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
                  <div
                    className="addStage"
                    onClick={() => {
                      addSequence();
                    }}
                  >
                    <ButtonAdd />
                  </div>
                </SelectorWrapper>
                <SequencesWrapper>
                  {newFlow.sequences.map((sequence, idx) => {
                    return (
                      <SequenceItem key={idx}>
                        <StageName>
                          {
                            stages.find((stage) => {
                              return sequence.from == stage._id;
                            }).name
                          }
                        </StageName>
                        {'=>'}
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
                  setModalOpen(false);
                }}
              >
                <span>Salvar</span>
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
    </>
  );
}

export default Flows;
