import React from 'react';
import api from 'services/api';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Ring } from 'react-awesome-spinners';
import { useLocation, Link } from 'react-router-dom';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { Container, FlowWrapper } from './styles';
import Button from 'components/Button/Button';
import FlowViewer from 'components/FlowViewer/FlowViewer';
import ModalHeader from 'components/ModalHeader/ModalHeader';
import ModalBody from 'components/ModalBody/ModalBody';

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px'
  }
};

const flowStyle = {
  zIndex: '0'
};

const textAreaStyle = {
  minHeight: '200px',
  minWidth: '400px'
};

const btnStyle = {
  color: '#f1f1f1',
  backgroundColor: '#304974',
  borderRadius: '20px',
  padding: '10px 15px',
  fontWeight: 'bold',
  marginTop: '20px'
};

function ShowProcess() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [observation, setObservation] = useState('');
  const location = useLocation();
  const [stages, setStages] = useState([]);
  const { proc } = location.state;
  const [flow, setFlow] = useState(null);

  useEffect(() => {
    fetchFlow();
    fetchStages();
    // eslint-disable-next-line
  }, []);

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  async function fetchStages() {
    let response = await api.get('/stages');
    setStages(response.data.Stages);
  }

  async function fetchFlow() {
    if (location.state.flow) setFlow(location.state.flow);
    else {
      let response = await api.get(`/flows/${proc.fluxoId}`);
      setFlow(response.data);
    }
  }

  async function nextStage() {
    try {
      let stageTo = '';
      for (let proc_iterator of flow.sequences) {
        if (proc_iterator.from == proc.etapaAtual) {
          stageTo = proc_iterator.to;
          break;
        }
      }

      await api.put('/processNextStage/', {
        processId: proc._id,
        stageIdTo: stageTo,
        stageIdFrom: proc.etapaAtual,
        observation: observation
      });

      const response = await api.get(`getOneProcess/${proc._id}`);

      proc.etapaAtual = stageTo;
      proc.etapas = response.data.etapas;
      closeModal();

      toast.success('Etapa avançada!', { duration: 4000 });
    } catch (error) {
      if (error.response.status == 401) {
        toast(error.response.data.message, {
          icon: '⚠️',
          duration: 3000
        });
      } else {
        toast.error('Erro ao avançar etapa \n ' + error.response.data.message, {
          duration: 3000
        });
      }
    }
  }

  return (
    <>
      <Container>
        <Link to="../processes" state={flow} className="voltarButton">
          <span>Voltar</span>
        </Link>
        <div className="processInfo">
          <h1>
            {proc.apelido.length > 0
              ? proc.apelido
              : `Processo ${proc.registro}`}
          </h1>
          <div className="process">
            {proc.apelido.length > 0
              ? `${proc.registro} - ${proc.apelido}`
              : `${proc.registro}`}
          </div>
        </div>
        {flow ? (
          <FlowWrapper style={flowStyle}>
            <FlowViewer
              stages={stages}
              flow={flow}
              highlight={proc.etapaAtual}
              proc={proc}
            ></FlowViewer>
          </FlowWrapper>
        ) : (
          <Ring />
        )}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="avançar etapa"
        >
          <ModalHeader close={closeModal}>Avançar etapa</ModalHeader>
          <ModalBody>
            <textarea
              className="observation-field"
              placeholder="Observações sobre a etapa atual..."
              style={textAreaStyle}
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            ></textarea>
            <button style={btnStyle} onClick={nextStage}>
              Avançar
            </button>
          </ModalBody>
        </Modal>
        <Button onClick={() => openModal()}>
          <SkipNextIcon />
          <span>Avançar etapa</span>
        </Button>
      </Container>
    </>
  );
}

export default ShowProcess;
