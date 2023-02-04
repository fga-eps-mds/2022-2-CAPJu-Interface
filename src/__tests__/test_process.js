import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { baseURL } from 'services/api';
import Processes from 'pages/Processes/Processes';
import {
  usersResponse,
  flowsResponse,
  processResponse,
  prioritiesResponse,
  stagesResponse
} from '../testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const scopeGetProcesses = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/processes/')
  .reply(200, processResponse);

describe('Testes de Processos', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const scope = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/flows/')
      .reply(200, flowsResponse)
      .get('/priorities')
      .reply(200, prioritiesResponse)
      .get('/stages')
      .reply(200, stagesResponse);

    render(
      <MemoryRouter initialEntries={['/processes']}>
        <Routes>
          <Route path="/processes" element={<Processes />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(scope.isDone()).toBe(true);
        expect(scopeGetProcesses.isDone()).toBe(true);
      },
      { timeout: 1000 }
    );
  });

  it('Teste criação de processo', async () => {
    const scopePost = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/newProcess')
      .reply(200)
      .post('/newProcess')
      .reply(200);

    screen.getByText('Processos');
    await screen.findByText('1111');

    // criando processo
    const createButton = await screen.getByText('+ Adicionar Processo');
    fireEvent.click(createButton);

    await screen.getByText('Criar Processo');

    const priorityRadio = screen.getByLabelText('sim');
    const flowNameInput = screen.getByTestId('react-select-mock');
    const registryInput = screen.getByPlaceholderText('registro');
    const nickNameInput = screen.getByPlaceholderText('apelido');
    const submitButton = screen.getByText('Confirmar');

    fireEvent.click(priorityRadio);

    const prioritySelectionList = screen.getAllByTestId('react-select-mock')[0];

    userEvent.selectOptions(
      prioritySelectionList,
      prioritiesResponse[0].description
    );
    userEvent.selectOptions(flowNameInput, flowsResponse[0].name);
    fireEvent.change(registryInput, {
      target: { value: '99994444556666111122' }
    });
    fireEvent.change(nickNameInput, { target: { value: 'Processo teste' } });
    fireEvent.click(submitButton);

    // await waitFor(() => expect(scopePost.isDone()).toBe(true));
  });

  it('Teste erro criação de processo', async () => {
    const scopePost = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/newProcess')
      .reply(200)
      .post('/newProcess')
      .reply(401);

    const createButton = await screen.getByText('+ Adicionar Processo');
    fireEvent.click(createButton);

    await screen.getByText('Criar Processo');

    const priorityRadio = screen.getByLabelText('sim');
    const flowNameInput = screen.getByTestId('react-select-mock');
    const registryInput = screen.getByPlaceholderText('registro');
    const nickNameInput = screen.getByPlaceholderText('apelido');
    const submitButton = screen.getByText('Confirmar');

    fireEvent.click(priorityRadio);

    const prioritySelectionList = screen.getAllByTestId('react-select-mock')[0];

    userEvent.selectOptions(
      prioritySelectionList,
      prioritiesResponse[0].description
    );
    userEvent.selectOptions(flowNameInput, flowsResponse[0].name);
    fireEvent.change(registryInput, {
      target: { value: '99994444556666111122' }
    });
    fireEvent.change(nickNameInput, { target: { value: 'Processo teste' } });
    fireEvent.click(submitButton);
  });

  it('Teste criação de processo sem registro', async () => {
    const createButton = await screen.getByText('+ Adicionar Processo');
    fireEvent.click(createButton);

    await screen.getByText('Criar Processo');
    const submitButton = screen.getByText('Confirmar');
    fireEvent.click(submitButton);
  });

  it('Teste edição de processo', async () => {
    const scopePutProcess = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateProcess')
      .reply(200, null)
      .put('/updateProcess')
      .reply(200, {
        message: 'Processo editado com sucesso'
      });

    screen.getByText('Processos');
    await screen.findByText('1111');

    const editProcessButton = screen.getAllByTestId('EditIcon')[0];
    fireEvent.click(editProcessButton);

    await screen.getByText('Editar Processo');

    const priorityRadio = screen.getByLabelText('não');
    const submitButton = screen.getByText('Confirmar');
    const flowNameInput = screen.getByTestId('react-select-mock');

    userEvent.selectOptions(flowNameInput, flowsResponse[0].name);

    fireEvent.click(priorityRadio);
    fireEvent.click(submitButton);

    await waitFor(() => expect(scopePutProcess.isDone()).toBe(true));
  });

  it('Teste de exclusão de processo', async () => {
    const processDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(`/deleteProcess/${processResponse[0].record}`)
      .reply(200)
      .delete(`/deleteProcess/${processResponse[0].record}`)
      .reply(200);

    screen.getByText('Processos');
    await screen.findByText('1111');

    const deleteProcessButton = screen.getAllByTestId('DeleteForeverIcon')[0];
    fireEvent.click(deleteProcessButton);

    await screen.getByText('Excluir Processo');
    const submitButton = screen.getByText('Confirmar');

    fireEvent.click(submitButton);
    await waitFor(() => expect(processDelete.isDone()).toBe(true));
  });

  it('Teste busca de processos prioritarios', async () => {
    screen.getByText('Processos');
    const filterByPriorityCheckbox = screen.getByLabelText(
      'Mostrar processos com Prioridade Legal'
    );
    fireEvent.click(filterByPriorityCheckbox);

    await expect(screen.getAllByRole('row')).toHaveLength(1);
  });

  it('Teste erro ao deletar um processo', async () => {
    const processDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(`/deleteProcess/${processResponse[0].record}`)
      .reply(200)
      .delete(`/deleteProcess/${processResponse[0].record}`)
      .reply(401);

    const deleteProcessButton = screen.getAllByTestId('DeleteForeverIcon')[0];
    fireEvent.click(deleteProcessButton);

    await screen.getByText('Excluir Processo');
    const submitButton = screen.getByText('Confirmar');

    fireEvent.click(submitButton);
    await waitFor(() => expect(processDelete.isDone()).toBe(true));
  });

  it('Teste erro ao deletar um processo com erro 400', async () => {
    const processDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(`/deleteProcess/${processResponse[0].record}`)
      .reply(200)
      .delete(`/deleteProcess/${processResponse[0].record}`)
      .reply(400);

    const deleteProcessButton = screen.getAllByTestId('DeleteForeverIcon')[0];
    fireEvent.click(deleteProcessButton);

    await screen.getByText('Excluir Processo');
    const submitButton = screen.getByText('Confirmar');

    fireEvent.click(submitButton);
    await waitFor(() => expect(processDelete.isDone()).toBe(true));
  });

  it('Teste erro ao editar um processo', async () => {
    const scopePutProcess = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateProcess')
      .reply(200)
      .put('/updateProcess')
      .reply(401);

    const editProcessButton = screen.getAllByTestId('EditIcon')[0];
    fireEvent.click(editProcessButton);

    await screen.getByText('Editar Processo');
    const submitButton = screen.getByText('Confirmar');
    const flowNameInput = screen.getByTestId('react-select-mock');

    userEvent.selectOptions(flowNameInput, flowsResponse[0].name);

    fireEvent.click(submitButton);

    await waitFor(() => expect(scopePutProcess.isDone()).toBe(true));
  });

  it('Teste erro ao editar um processo erro 400', async () => {
    const scopePutProcess = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateProcess')
      .reply(200)
      .put('/updateProcess')
      .reply(400);

    const editProcessButton = screen.getAllByTestId('EditIcon')[0];
    fireEvent.click(editProcessButton);

    await screen.getByText('Editar Processo');
    const submitButton = screen.getByText('Confirmar');
    const flowNameInput = screen.getByTestId('react-select-mock');

    userEvent.selectOptions(flowNameInput, flowsResponse[0].name);

    fireEvent.click(submitButton);

    await waitFor(() => expect(scopePutProcess.isDone()).toBe(true));
  });
});

afterAll(() => nock.restore());
