import React from 'react';
import axios from 'axios';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Flows from 'pages/Flows/Flows';
import { baseURL } from 'services/api';
import { flowsResponse, stagesResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const scopeGet = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/flows')
  .reply(200, flowsResponse)
  .get('/stages')
  .reply(200, stagesResponse);

test('Testando criar fluxo no componente Flows', async () => {
  const scope = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/newFlow')
    .reply(200, {
      _id: 'meuIdAleatório',
      name: 'perito',
      stages: ['etpa c', 'etpa c2'],
      sequences: [],
      createdAt: '2022-08-17T20:11:43.499+00:00',
      updatedAt: '2022-08-17T20:11:43.499+00:00',
      __v: 0
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Flows />} />
      </Routes>
    </MemoryRouter>
  );

  const buttonFlow = screen.getByText('+ Adicionar Fluxo');
  fireEvent.click(buttonFlow);

  const modalName = screen.getByText('Novo Fluxo');
  const inputFlow = screen.getByPlaceholderText('Nome do fluxo');
  const button = screen.getByText('Salvar');
  const close = screen.getByTestId('close');
  fireEvent.change(inputFlow, { target: { value: 'perito' } });
  fireEvent.click(button);
  fireEvent.click(close);
  expect(modalName).toHaveTextContent('Novo Fluxo');
  await waitFor(() => expect(scope.isDone()).toBe(true));
});

test('Testando editar fluxo no componente Flows', async () => {
  const scopeEditar = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .options('/editFlow')
    .reply(200, 'ok')
    .put('/editFlow')
    .reply(200, {
      __v: 0,
      _id: '62fd4b16006730249d33b19d',
      createdAt: '2022-08-17T20:09:58.530Z',
      deleted: false,
      name: 'flow4',
      sequences: [
        {
          from: '62fd4ac0006730249d33b185',
          to: '62fd4ac5006730249d33b188'
        },
        {
          from: '62fd4ac5006730249d33b188',
          to: '62fd4acb006730249d33b18b'
        },
        {
          from: '62fd4acb006730249d33b18b',
          to: '62fd4acb006730249d33b18c'
        }
      ],
      stages: [
        '62fd4ac0006730249d33b185',
        '62fd4ac5006730249d33b188',
        '62fd4acb006730249d33b18b',
        '62fd4acb006730249d33b18c'
      ],
      updatedAt: '2022-08-17T20:09:58.530Z'
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Flows />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  const flow = await screen.findByText('fluxo 1');
  expect(flow).toBeInTheDocument();

  const editIcon = screen.queryAllByTestId('EditIcon');
  fireEvent.click(editIcon[0]);
  const editModal = screen.getByText('Editar fluxo');
  const input = screen.getByDisplayValue('fluxo 1');
  const button = screen.getByText('Salvar');
  const dropdown = screen.queryAllByTestId('react-select-mock');
  const add = screen.queryAllByText('Adicionar');
  fireEvent.change(input, { target: { value: 'flow4' } });
  fireEvent.change(dropdown[0], {
    target: { value: '62fd4acb006730249d33b18c' }
  });
  fireEvent.click(add[0]);
  const stage = screen.getAllByText('etpa c4');
  expect(stage[1]).toHaveTextContent('etpa c4');
  fireEvent.change(dropdown[1], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.change(dropdown[2], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.click(add[1]);
  const retreat = screen.getByText('Retroceder');
  fireEvent.click(retreat);
  fireEvent.change(dropdown[1], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.change(dropdown[2], {
    target: { value: '62fd4acb006730249d33b18b' }
  });
  fireEvent.click(add[1]);
  expect(editModal).toHaveTextContent('Editar fluxo');
  expect(retreat).toHaveTextContent('Retroceder');
  fireEvent.click(button);
  await waitFor(() => expect(scopeEditar.isDone()).toBe(true));
});

test('Testando deletar fluxo no componente Flows', async () => {
  const scopeDelete = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/deleteFlow')
    .reply(200, {
      result: 'Deletado com sucesso'
    });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Flows />} />
      </Routes>
    </MemoryRouter>
  );

  const deleteIcon = await screen.findAllByTestId('DeleteForeverIcon');
  fireEvent.click(deleteIcon[1]);

  const modalName = screen.getByText('Deseja realmente excluir este Fluxo?');
  const button = screen.getByText('Confirmar');
  fireEvent.click(button);
  expect(screen.queryByText('fluxo 2')).toBeNull();
  expect(modalName).toHaveTextContent('Deseja realmente excluir este Fluxo?');
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));
});

afterAll(() => nock.restore());
