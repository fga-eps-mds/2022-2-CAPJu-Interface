import React from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useLocation } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import api from 'services/api';
import Button from 'components/Button/Button';
import ModalBody from 'components/ModalBody/ModalBody';
import TextInput from 'components/TextInput/TextInput';
import ModalHeader from 'components/ModalHeader/ModalHeader';
import { Container, InputSearch, AddProcess } from './styles';

function Processes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [registro, setRegistro] = useState('');
  const [apelido, setApelido] = useState('');
  const [processId, setProcessesId] = useState('');
  const [editOrCreate, setEditOrCreate] = useState('');
  const location = useLocation();
  const flow = location.state;
  const processesList = location.state;
  const [flows, setFlows] = useState([]);
  const [flowId, setFlowId] = useState(flow ? flow._id : '');
  const [stages, setStages] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [currentStage, setCurrentStage] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px'
    }
  };

  useEffect(() => {
    getFlows();
    getStages();
    updateProcesses();
    updateTitle();
  });

  const updateProcesses = async () => {
    setProcesses(location.state);
  };

  const updateTitle = () => {
    let stageName = '';
    for (let stage of stages) {
      if (stage._id === processesList[0].etapaAtual) {
        stageName = stage.name;
        break;
      }
    }

    setCurrentStage(stageName);
  };

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
    } catch (error) {
      toast.error(
        'Erro ao deletar processo \n ' + error.response.data.message,
        { duration: 3000 }
      );
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
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
      toast.error(
        'Erro ao alterar processo \n ' + error.response.data.message,
        { duration: 3000 }
      );
    }
  }

  async function createProcess() {
    try {
      const flow = flows.find((flow) => flow._id === flowId);
      if (registro) {
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
      toast.error(
        'Erro ao registrar processo \n ' + error.response.data.message,
        { duration: 3000 }
      );
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
        <h1>Processos na etapa {currentStage ? '- ' + currentStage : ''}</h1>
        <div className="processSearch">
          <InputSearch
            value={searchTerm}
            placeholder={'Buscar Processo'}
            onChange={handleChange}
          />
        </div>
        {processes.length == 0 && 'Nenhum processo foi encontrado'}
        {filterProcesses(processes)
          .sort((a, b) => b.etapas.length - a.etapas.length)
          .map((proc, idx) => {
            return (
              <div key={idx} className="process">
                <div className="processName">
                  {proc.apelido.length > 0
                    ? `${proc.registro} - ${proc.apelido}`
                    : `${proc.registro}`}
                  {
                    <Link to="showProcess" state={{ proc, stages }}>
                      <Visibility className="see-process"></Visibility>
                    </Link>
                  }
                  <EditIcon
                    className="edit-process"
                    onClick={() => openEditModal(proc)}
                  />
                  <DeleteForeverIcon
                    className="delete-process"
                    onClick={() => openModal()}
                  />
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="excluir processo"
                  >
                    <ModalHeader close={closeModal}>
                      Excluir Processo
                    </ModalHeader>
                    <p>
                      Tem certeza que deseja excluir o processo {proc.registro}?
                    </p>
                    <ModalBody>
                      <Button
                        onClick={async () => {
                          await deleteProcess(proc.registro);
                          closeModal();
                        }}
                      >
                        Confirmar
                      </Button>
                      <Button onClick={closeModal} background="red">
                        Cancelar
                      </Button>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            );
          })}
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="editar processo"
        >
          <ModalHeader close={closeModal}>
            {editOrCreate == 'edit' ? 'Editar Processo' : 'Criar Processo'}
          </ModalHeader>
          <ModalBody>
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
            <p> Registro </p>
            <TextInput
              value={registro}
              set={setRegistro}
              placeholder="registro"
            />
            <p> Apelido</p>
            <TextInput value={apelido} set={setApelido} placeholder="apelido" />
            <Button
              onClick={async () => {
                if (editOrCreate == 'edit') await editProcess();
                else await createProcess();
                closeModal();
              }}
            >
              Confirmar
            </Button>
            <Button onClick={closeModal} background="red">
              Cancelar
            </Button>
          </ModalBody>
        </Modal>
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
