import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { baseURL } from 'services/api';
import Processes from 'pages/Processes/Processes';
import { isLate } from 'components/IsLate/index.js';
import TextInput from 'components/TextInput/TextInput';
import ShowProcess from 'pages/ShowProcess/ShowProcess';
import {
  flowsResponse,
  processResponse,
  stagesResponse
} from '../testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

test('testando TextInput', () => {
  let registro = '';
  const setRegistro = jest.fn((novoRegistro) => {
    registro = novoRegistro;
  });

  const { getByDisplayValue } = render(
    <TextInput value={registro} set={setRegistro} />
  );

  const inputElement = getByDisplayValue('');

  fireEvent.change(inputElement, { target: { value: 'anything' } });

  expect(setRegistro).toHaveBeenCalledTimes(1);
});

const process = processResponse.processes[0];
const flow = flowsResponse.Flows[0];
const newProcess = {
  registro: '2222',
  apelido: 'novoReg',
  etapaAtual: flowsResponse.Flows[1].sequences[0].from,
  arquivado: false,
  fluxoId: flowsResponse.Flows[1]._id
};

const stage = stagesResponse.Stages[0];
test('teste processos', async () => {
  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get(/\/processes\/(.+)?/)
    .reply(200, processResponse)
    .get('/flows/')
    .reply(200, flowsResponse)
    .get('/stages')
    .reply(200, stagesResponse);

  const scopePost = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newProcess', newProcess)
    .reply(200, {
      ...newProcess,
      _id: 'meuIdAleatório',
      etapas: [],
      createdAt: '2022-08-17T20:11:43.499+00:00',
      updatedAt: '2022-08-17T20:11:43.499+00:00',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/processes']}>
      <Routes>
        <Route path="/processes" element={<Processes />} />
        <Route path="/processes/showProcess" element={<ShowProcess />} />
      </Routes>
    </MemoryRouter>
  );
  // mostrando conteúdo
  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  screen.getByText('Processos');

  await screen.findByText('1111');

  // criando processo
  const createButton = screen.getByText('+ Adicionar Processo');
  fireEvent.click(createButton);
  let modalHeader = screen.queryByText('Criar Processo');
  expect(modalHeader).toBeInTheDocument();
  let fluxoInput = screen.getByTestId('react-select-mock');
  let registroInput = screen.getByPlaceholderText('registro');
  let apelidoInput = screen.getByPlaceholderText('apelido');
  let submit = screen.getByText('Confirmar');
  fireEvent.change(fluxoInput, { target: { value: newProcess.fluxoId } });
  fireEvent.change(registroInput, { target: { value: newProcess.registro } });
  fireEvent.change(apelidoInput, { target: { value: newProcess.apelido } });
  fireEvent.click(submit);
  await waitFor(() => expect(scopePost.isDone()).toBe(true));

  //editando processo
  const putURL = `/updateProcess/${process._id}`;
  const scopeEdit = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(putURL)
    .reply(200, 'ok')
    .put(putURL, {
      fluxoId: /.*/,
      registro: /.*/,
      apelido: /.*/
    })
    .reply(200, { result: 'atualizado' });
  const editIcon = screen.getByTestId('EditIcon');
  fireEvent.click(editIcon);
  modalHeader = screen.queryByText('Editar Processo');
  expect(modalHeader).toBeInTheDocument();
  submit = screen.getByText('Confirmar');
  fluxoInput = screen.getByTestId('react-select-mock');
  expect(fluxoInput).toHaveValue(process.fluxoId);
  registroInput = screen.getByDisplayValue(process.registro);
  apelidoInput = screen.getByDisplayValue(process.apelido);
  fireEvent.change(apelidoInput, { target: { value: 'novoApelido' } });
  fireEvent.click(submit);
  await waitFor(() => expect(scopeEdit.isDone()).toBe(true));

  // entrando em detalhar processo
  const scopeStages = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .get(`/flows/${process.fluxoId}`)
    .reply(200, flowsResponse.Flows[0]);
  const visibilityIcon = screen.getByTestId('VisibilityIcon');
  fireEvent.click(visibilityIcon);
  await waitFor(() => expect(scopeStages.isDone()).toBe(true));
  expect(screen.queryByText('Processos')).not.toBeInTheDocument();

  // avançando etapa
  const nextStageObj = {
    processId: process._id,
    stageIdTo: flow.sequences[0].to,
    stageIdFrom: process.etapaAtual,
    observation: 'obs'
  };
  const nextStageURL = '/processNextStage/';
  const scopeNextStage = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(nextStageURL)
    .reply(200)
    .put(nextStageURL, nextStageObj)
    .reply(200, null)
    .get(`/getOneProcess/${process._id}`)
    .reply(200, process);
  const nextButton = screen.getByText('Avançar etapa');
  fireEvent.click(nextButton);
  const obsInput = screen.getByPlaceholderText(
    'Observações sobre a etapa atual...'
  );
  submit = screen.getByText('Avançar');
  fireEvent.change(obsInput, { target: { value: nextStageObj.observation } });
  fireEvent.click(submit);
  await waitFor(() => expect(scopeNextStage.isDone()).toBe(true));

  // voltando para a pagina de processos
  const backButton = screen.getByText('Voltar');
  fireEvent.click(backButton);
  screen.getByText(`Processos - ${flow.name}`);

  // deletando o processo
  const deleteURL = `/deleteProcess/${process.registro}`;
  await screen.findByText(process.registro);
  const scopeDelete = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(deleteURL)
    .reply(200)
    .delete(deleteURL)
    .reply(200);
  const deleteIcon = screen.getByTestId('DeleteForeverIcon');
  fireEvent.click(deleteIcon);
  screen.getByText('Excluir Processo');
  submit = screen.getByText('Confirmar');
  fireEvent.click(submit);
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));
  expect(screen.queryByText('Excluir Processo')).not.toBeInTheDocument();
});

describe('testando função de atraso', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  test('testando isLate sem atraso', () => {
    const mockedDate = new Date(process.createdAt);
    jest.setSystemTime(mockedDate);

    const result = isLate(stage, process, flow);

    expect(result).toBe(false);
  });

  test('testando isLate com atraso', () => {
    const lateDate = new Date(process.createdAt);
    lateDate.setDate(lateDate.getDate() - parseInt(stage.time) - 1);
    jest.setSystemTime(lateDate);

    const result = isLate(stage, process, flow);

    expect(result).toBe(true);
  });
});
afterAll(() => nock.restore());
