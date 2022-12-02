import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';

import { baseURL } from 'services/api';
import Unidades from 'pages/Unidades/Unidades';
import { units } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const unitsGet = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/unitys')
  .reply(200, units);

test('Teste listagem de unidades', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Unidades />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(unitsGet.isDone()).toBe(true));

  const unit = screen.getByText('Unidade 1');
  expect(unit).toBeInTheDocument();
});
