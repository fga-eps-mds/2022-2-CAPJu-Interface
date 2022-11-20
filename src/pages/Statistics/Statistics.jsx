import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import api from 'services/api';
import { Container, StagesArea, StageItem } from './styles';

function Statistics() {
  const [stages, setStages] = useState([]);
  const [processes, setProcesses] = useState([]);
  const location = useLocation();
  const flow = location.state;

  useEffect(() => {
    async function updateStats() {
      const stagesFlow = flow.stages;

      const response = await api.get('/stages');
      const flowprocess = await api.get(`/processes/${flow ? flow._id : ''}`);
      setProcesses(flowprocess.data.processes);
      const stagesResponse = response.data.Stages;
      const targetStages = [];
      for (let stage of await stagesResponse) {
        delete stage.createdAt;
        delete stage.__v;
        delete stage.updatedAt;
        delete stage.deleted;
        for (let stageFlow of stagesFlow) {
          if (stage._id === stageFlow) {
            stage.processesQtt = 0;
            stage.processesList = [];
            targetStages.push(stage);
            continue;
          }
        }
      }
      for (let process of processes) {
        for (let stage of targetStages) {
          if (process.etapaAtual === stage._id) {
            stage.processesQtt += 1;
            stage.processesList.push(process);
            continue;
          }
        }
      }
      setStages(targetStages);
    }
    updateStats();
    console.log(stages);
  }, [stages, flow, processes]);

  return (
    <>
      <Container>
        Estatística de fluxo
        <StagesArea>
          {stages.map((stage, index) => {
            return (
              <StageItem key={index}>
                {stage.processesQtt > 0 ? (
                  <Link to="stageProcesses" state={stage.processesList}>
                    <h3>{stage.processesQtt}</h3>
                  </Link>
                ) : (
                  <h3>{stage.processesQtt}</h3>
                )}
                <strong>{` processos na etapa ${stage.name}`}</strong>
              </StageItem>
            );
          })}
        </StagesArea>
      </Container>
    </>
  );
}

export default Statistics;
