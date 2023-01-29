import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { baseURL } from 'services/api';
import Processes from 'pages/Processes/Processes';
import { isLate } from 'components/IsLate/index.js';
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

    await waitFor(() => expect(scope.isDone()).toBe(true));
    await waitFor(() => expect(scopeGetProcesses.isDone()).toBe(true));
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
});

afterAll(() => nock.restore());
