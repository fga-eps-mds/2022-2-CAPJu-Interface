import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { baseURL } from 'services/api';
import Processes from 'pages/Processes/Processes';
import { flowsResponse, processResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockFlowsResponse = flowsResponse;
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useLocation: () => {
      return { state: mockFlowsResponse.Flows[0] };
    }
  };
});

test('Testando busca por registro ou apelido', async () => {
  const scope = nock(baseURL)
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
    .reply(200, { Stages: null });

  render(
    <MemoryRouter initialEntries={['/processes']}>
      <Routes>
        <Route path="/processes" element={<Processes />} />
      </Routes>
    </MemoryRouter>
  );

  const inputName = screen.getByPlaceholderText('Buscar Processo');
  fireEvent.change(inputName, { target: { value: '1111' } });
  await waitFor(() => expect(scope.isDone()).toBe(true));
});

afterAll(() => nock.restore());
