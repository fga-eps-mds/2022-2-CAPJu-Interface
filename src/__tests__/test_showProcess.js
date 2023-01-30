import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-test-renderer';

import { baseURL } from 'services/api';
import ShowProcess from 'pages/ShowProcess/ShowProcess';
import {
  usersResponse,
  flowsResponse,
  precessForShowProcess,
  stagesResponse
} from '../testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Testes da pagina de detalhes de um processo', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const scopeGet = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(`/flows/process/${precessForShowProcess[0].record}`)
      .reply(200, flowsResponse)
      .get('/stages')
      .reply(200, stagesResponse)
      .get(`/getOneProcess/${precessForShowProcess[0].record}`)
      .reply(200, precessForShowProcess[0])
      .get(`/flow/${flowsResponse[0].idFlow}`)
      .reply(200, flowsResponse[0]);

    render(
      <MemoryRouter
        // @ts-ignore
        initialEntries={['/', { state: { proc: precessForShowProcess[0] } }]}
      >
        <Routes>
          <Route path="/" element={<ShowProcess />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  });

  it('Teste de avançar etapa', () => {
    const nextStageButton = screen.getByText('Avançar etapa');
    fireEvent.click(nextStageButton);

    const commentaryInput = screen.getByPlaceholderText(
      'Observações sobre a etapa atual...'
    );
    const confirmButton = screen.getByText('Avançar');

    act(() =>
      // @ts-ignore
      fireEvent.change(commentaryInput, { target: { value: 'teste' } })
    );
    fireEvent.click(confirmButton);
  });
});
