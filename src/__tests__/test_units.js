import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';

import { baseURL } from 'services/api';
import { userURL } from 'services/user';
import Unidades from 'pages/Unidades/Unidades';
import { units, adminsList, usersResponse } from 'testConstants';
import userEvent from '@testing-library/user-event';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const getUnits = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/unitys')
  .reply(200, units);

const postUnit = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .post('/newUnity')
  .reply(200, {
    _id: 'meuIdAleatório',
    name: 'unidade 3',
    createdAt: '2022-08-17T20:11:43.499+00:00',
    updatedAt: '2022-08-17T20:11:43.499+00:00',
    __v: 0
  });

const getAdmins = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get(/unityAdmins/)
  .reply(200, adminsList);

const getUsers = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get(/searchUsers/)
  .reply(200, usersResponse);

const postAdmin = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .post(/setUnityAdmin/)
  .reply(200, 'ok');

describe('Testando Unidades', () => {
  it('Testando criar Unidades', async () => {
    render(
      <MemoryRouter initialEntries={['/unidades']}>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(getUnits.isDone()).toBe(true));

    const buttonUnit = screen.getByText('+ Adicionar Unidade');
    expect(buttonUnit).toBeInTheDocument();
    act(() => buttonUnit.click());

    await screen.getByText('Salvar');
    let input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'unidade 3' } });

    const buttonSave = screen.getByText('Salvar');
    expect(buttonSave).toBeInTheDocument();
    act(() => buttonSave.click());

    await waitFor(() => expect(postUnit.isDone()).toBe(true));
  });

  it('Teste cancela criação de unidade', async () => {
    render(
      <MemoryRouter initialEntries={['/unidades']}>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(getUnits.isDone()).toBe(true));

    const buttonUnit = screen.getByText('+ Adicionar Unidade');
    expect(buttonUnit).toBeInTheDocument();
    act(() => buttonUnit.click());

    await screen.getByText('Salvar');
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'unidade 3' } });

    const buttonCancel = screen.getByText('Cancelar');
    expect(buttonCancel).toBeInTheDocument();
    act(() => buttonCancel.click());

    await waitFor(() => expect(input).not.toBeInTheDocument());
  });

  it('Teste visualizar admins', async () => {
    render(
      <MemoryRouter initialEntries={['/unidades']}>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(getUnits.isDone()).toBe(true));

    const listAdminsButton = screen.getByLabelText('Visualizar Admins');
    expect(listAdminsButton).toBeInTheDocument();
    act(() => userEvent.click(listAdminsButton));

    await waitFor(() => expect(getAdmins.isDone()).toBe(true));
    await screen.getByText('Administradores -');

    expect(screen.getByText('Lude Teste')).toBeInTheDocument();
    expect(screen.getByText('Fernando')).toBeInTheDocument();

    const returnButton = screen.getByText('Voltar');
    expect(returnButton).toBeInTheDocument();
    act(() => userEvent.click(returnButton));
  });

  it('Teste adicionar admins', async () => {
    render(
      <MemoryRouter initialEntries={['/unidades']}>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(getUnits.isDone()).toBe(true));

    const addAdminButton = screen.getByLabelText('Adicionar Admins');
    expect(addAdminButton).toBeInTheDocument();
    act(() => userEvent.click(addAdminButton));

    await waitFor(() => expect(getUsers.isDone()).toBe(true));
    await screen.getByText('Administradores -');

    const makeAdminButton = screen.getAllByLabelText('Adicionar como Admin')[0];
    expect(makeAdminButton).toBeInTheDocument();
    userEvent.click(makeAdminButton);

    await waitFor(() => expect(postAdmin.isDone()).toBe(true));

    const returnButton = screen.getByText('Voltar');
    expect(returnButton).toBeInTheDocument();
    act(() => userEvent.click(returnButton));
  });
});
