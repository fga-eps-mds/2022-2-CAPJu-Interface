import React from 'react';
import toast from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  Container,
  InputSearch,
  AddProcess,
  Table,
  Content,
  ContentHeader,
  Modal
} from './styles';
import api from 'services/api';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import { isLate } from 'components/IsLate/index.js';

function Processes() {
  const [processes, setProcesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteProcessModal, setDeleteProcessModal] = useState(-1);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const [processId, setProcessesId] = useState('');
  const [editOrCreate, setEditOrCreate] = useState('');
  const location = useLocation();
  const flow = location.state;
  const [flows, setFlows] = useState([]);
  const [flowId, setFlowId] = useState(flow ? flow._id : '');
  const [stages, setStages] = useState([]);

  useEffect(() => {
    updateProcesses();
    getFlows();
    getStages();
    console.log(flows);
    // eslint-disable-next-line
  }, []);

  async function updateProcesses() {
    const response = await api.get(`/processes/${flow ? flow._id : ''}`);
    console.log(flow);
    setProcesses(response.data.processes);
  }

  //Catch the event when the input changes
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Filter processes by register and nickname
  const filterProcesses = (arr) => {
    return arr.filter((processes) => {
      if (searchTerm == '') {
        return processes;
      } else if (
        processes.registro.toLowerCase().includes(searchTerm) ||
        processes.apelido.toLowerCase().includes(searchTerm)
      ) {
        return processes;
      }
    });
  };

  async function deleteProcess(registro) {
    try {
      await api.delete(`/deleteProcess/${registro}`);
      toast.success('Processo Removido com Sucesso', { duration: 4000 });
      updateProcesses();
    } catch (error) {
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error(
          'Erro ao deletar processo \n ' + error.response.data.message,
          { duration: 3000 }
        );
      }
    }
  }

  function closeModal() {
    setEditModalIsOpen(false);
  }

  function openEditModal(proc) {
    if (proc) {
      setEditOrCreate('edit');
      setRegistro(proc.registro);
      setApelido(proc.apelido);
      setProcessesId(proc._id);
      setFlowId(proc.fluxoId);
    } else setEditOrCreate('create');

    console.log(editOrCreate);
    console.log(proc);
    setEditModalIsOpen(true);
  }

  async function getFlows() {
    const response = await api.get(`/flows/`);
    setFlows(response.data.Flows);
  }

  async function editProcess() {
    try {
      if (registro)
        await api.put(`/updateProcess/${processId}`, {
          registro: registro,
          apelido: apelido,
          fluxoId: flowId
        });
      else toast.error('Registro vazio', { duration: 3000 });
      toast.success('Processo Alterado com Sucesso', { duration: 4000 });
    } catch (error) {
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error(
          'Erro ao alterar processo \n ' + error.response.data.message,
          { duration: 3000 }
        );
      }
    }
  }

  async function createProcess() {
    try {
      const flow = flows.find((flow) => flow._id === flowId);
      if (registro && flow) {
        console.log('flow', flow);

        let sequences = flow.sequences;

        await api.post('/newProcess', {
          registro,
          apelido,
          etapaAtual: sequences[0].from,
          arquivado: false,
          fluxoId: flowId
        });
      } else {
        toast.error('Registro vazio', { duration: 3000 });
        return;
      }

      toast.success('Processo Registrado com Sucesso', { duration: 4000 });
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error(
          'Erro ao registrar processo \n ' + error.response.data.message,
          { duration: 3000 }
        );
      }
    }
  }

  async function getStages() {
    try {
      const Stage = await api.get(`/stages`);

      setStages(Stage.data.Stages);
    } catch (error) {
      toast.error('Erro ao pegar etapa\n ' + error.response.data.message, {
        duration: 3000
      });
    }
  }

  return (
    <Container>
      <div className="processes">
        <h1>Processos {flow ? '- ' + flow.name : ''}</h1>
        <div className="processSearch">
          <InputSearch
            value={searchTerm}
            placeholder={'Buscar Processo'}
            onChange={handleChange}
          />
        </div>
        {processes.length == 0 && (
          <>
            Nenhum processo foi encontrado <br></br> <br></br>{' '}
          </>
        )}
        <Table>
          <thead>
            <tr>
              <th>Registro</th>
              <th>Apelido</th>
              {flow && stages ? (
                <>
                  <th>Etapa Atual</th>
                  <th>Última Etapa</th>
                </>
              ) : (
                <></>
              )}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filterProcesses(processes)
              .sort((a, b) => b.etapas.length - a.etapas.length)
              .map((proc, idx) => {
                let CurrentStage, FinalStage, CurrentStagePos, FinalStagePos;

                if (flow && stages) {
                  CurrentStage = stages.find(
                    (el) => el._id === proc.etapaAtual
                  );
                  FinalStage = stages.find(
                    (el) => el._id === flow.sequences.at(-1).to
                  );

                  CurrentStagePos = stages.indexOf(CurrentStage) + 1;
                  FinalStagePos = stages.indexOf(FinalStage) + 1;
                }

                let className = 'processName ';

                if (flow) {
                  className += isLate(CurrentStage, proc, flow)
                    ? 'currentStage-red'
                    : 'currentStage-green';
                }

                return (
                  <tr key={idx} className={className}>
                    <td>{proc.registro}</td>
                    <td>{proc.apelido}</td>

                    {flow && stages ? (
                      <>
                        <td>
                          {CurrentStagePos}. {CurrentStage?.name}
                        </td>
                        <td className="processName finalStage">
                          {FinalStagePos}. {FinalStage?.name}
                        </td>
                      </>
                    ) : (
                      <></>
                    )}
                    <td>
                      <Tooltip title="Visualizar processo">
                        <Link to="showProcess" state={{ proc, flow }}>
                          <Visibility className="see-process"></Visibility>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Editar processo">
                        <EditIcon
                          className="edit-process"
                          onClick={() => openEditModal(proc)}
                        />
                      </Tooltip>
                      <Tooltip title="Deletar processo">
                        <DeleteForeverIcon
                          className="delete-process"
                          onClick={() => setDeleteProcessModal(idx)}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {editModalIsOpen && (
          <Modal>
            <Content>
              <ContentHeader>
                <span>
                  {editOrCreate == 'edit'
                    ? 'Editar Processo'
                    : 'Criar Processo'}{' '}
                </span>
              </ContentHeader>
              <Dropdown
                options={flows.map((flow) => {
                  return { label: flow.name, value: flow._id };
                })}
                onChange={(e) => {
                  setFlowId(e.value);
                }}
                value={flowId}
                placeholder="Selecione o fluxo"
                className="dropdown"
                controlClassName="dropdown-control"
                placeholderClassName="dropdown-placeholder"
                menuClassName="dropdown-menu"
                arrowClassName="dropdown-arrow"
              />
              <div>
                <p> Registro </p>
                <TextInput
                  value={registro}
                  set={setRegistro}
                  placeholder="registro"
                />
                <p> Apelido</p>
                <TextInput
                  value={apelido}
                  set={setApelido}
                  placeholder="apelido"
                />
              </div>
              <div>
                <Button
                  onClick={async () => {
                    if (editOrCreate == 'edit') await editProcess();
                    else await createProcess();
                    await updateProcesses();
                    closeModal();
                  }}
                >
                  Confirmar
                </Button>
                <Button onClick={closeModal} background="red">
                  Cancelar
                </Button>
              </div>
            </Content>
          </Modal>
        )}

        {deleteProcessModal != -1 && (
          <Modal>
            <Content>
              <ContentHeader>
                {' '}
                <span>Excluir Processo</span>
              </ContentHeader>
              <span>Deseja realmente excluir este Processo?</span>
              {processes[deleteProcessModal].registro} -{' '}
              {processes[deleteProcessModal].apelido}
              <div>
                <Button
                  onClick={async () => {
                    setDeleteProcessModal(-1);
                    deleteProcess(processes[deleteProcessModal].registro);
                  }}
                >
                  Confirmar
                </Button>
                <Button
                  onClick={() => {
                    setDeleteProcessModal(-1);
                  }}
                  background="red"
                >
                  Cancelar
                </Button>
              </div>
            </Content>
          </Modal>
        )}
      </div>
      <AddProcess
        onClick={() => {
          openEditModal(false);
        }}
      >
        + Adicionar Processo
      </AddProcess>
    </Container>
  );
}

export default Processes;
