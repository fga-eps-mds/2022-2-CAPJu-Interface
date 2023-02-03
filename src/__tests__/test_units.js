import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act
} from '@testing-library/react';

import { baseURL } from 'services/api';
import { userURL } from 'services/user';
import Unidades from 'pages/Unidades/Unidades';
import { Permissions } from 'util/permissionChecker';
import permissionChecker from 'util/permissionChecker';
import { units, adminsList, usersResponse } from 'testConstants';
import userEvent from '@testing-library/user-event';

function verifyPermissionUnits(user) {
  if (user.idRole == Permissions.ADMINISTRADOR) {
    return true;
  } else return false;
}

const getUnits = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/units')
  .reply(200, units);

const getAdmins = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get(/unitAdmins/)
  .reply(200, adminsList);

const postUnit = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .options('/newUnit')
  .reply(200)
  .post('/newUnit')
  .reply(200);

describe('Testando Unidades', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={['/unidades']}>
        <Routes>
          <Route path="/unidades" element={<Unidades />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(getUnits.isDone()).toBe(true));
  });

  usersResponse.forEach((user) => {
    if (!verifyPermissionUnits(user)) {
      it('Testando criar Unidades com sem permissão', async () => {
        localStorage.setItem('user', JSON.stringify(user));
        await waitFor(() =>
          expect(permissionChecker(user, 'create-unit')).toBe(false)
        );
      });
    }
  });

  adminsList.forEach((user) => {
    if (verifyPermissionUnits(user)) {
      it('Testando criar Unidades com permissão', async () => {
        localStorage.setItem('user', JSON.stringify(user));
        await waitFor(() =>
          expect(permissionChecker(user, 'create-unit')).toBe(true)
        );
      });
    }
  });

  usersResponse.forEach((user) => {
    if (verifyPermissionUnits(user)) {
      it('Teste cancela criação de unidade', async () => {
        localStorage.setItem('user', JSON.stringify(user));
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
    }
  });

  it('Teste visualizar admins', async () => {
    const listAdminsButton = screen.getByLabelText('Visualizar Admins');
    expect(listAdminsButton).toBeInTheDocument();
    act(() => userEvent.click(listAdminsButton));

    await waitFor(() => expect(getAdmins.isDone()).toBe(true));
    await screen.findByText('Administradores -');

    expect(screen.getByText('Lude Teste')).toBeInTheDocument();
    expect(screen.getByText('Fernando')).toBeInTheDocument();

    const returnButton = screen.getByText('Voltar');
    expect(returnButton).toBeInTheDocument();
    act(() => userEvent.click(returnButton));
  });

  it.skip('Teste buscar usuarios', async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const getUsers = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/allUser?accepted=true')
      .reply(200)
      .get('/allUser?accepted=true')
      .reply(200, usersResponse);

    const postAdmin = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post(/setUnitAdmin/)
      .reply(200, 'ok');

    const button = await screen.getByLabelText('Adicionar Admins');
    fireEvent.click(button);

    await screen.findByText('Administradores -');

    const makeAdminButton = screen.getAllByLabelText('Adicionar como Admin')[0];
    expect(makeAdminButton).toBeInTheDocument();
    userEvent.click(makeAdminButton);

    await waitFor(() => expect(postAdmin.isDone()).toBe(true));

    const searchButton = screen.getByText('Buscar');
    expect(searchButton).toBeInTheDocument();
    act(() => userEvent.click(searchButton));
  });

  it('Teste adicionar unidade', async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));

    const addUnitButton = await screen.getByText('+ Adicionar Unidade');
    fireEvent.click(addUnitButton);

    const modalTitle = await screen.getByText('Criar Unidade');
    expect(modalTitle).toBeInTheDocument();

    const unitNameInput = await screen.getByPlaceholderText('Nome da unidade');
    fireEvent.change(unitNameInput, { target: { value: 'Unidade 1' } });

    const saveButton = await screen.getByText('Salvar');
    fireEvent.click(saveButton);
  });

  it.skip('Teste adicionar admins', async () => {
    const getUsers = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/allUser?accepted=true')
      .reply(200)
      .get('/allUser?accepted=true')
      .reply(200, usersResponse);

    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const postAdmin = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .persist()
      .post(/setUnityAdmin/)
      .reply(200, 'ok');

    const button = await screen.getByLabelText('Adicionar Admins');
    fireEvent.click(button);

    await waitFor(() => expect(getUsers.isDone()).toBe(true));
    await screen.findByText('Administradores -');

    const makeAdminButton = screen.getAllByLabelText('Adicionar como Admin')[0];
    expect(makeAdminButton).toBeInTheDocument();
    userEvent.click(makeAdminButton);

    await waitFor(() => expect(postAdmin.isDone()).toBe(true));

    const returnButton = screen.getByText('Voltar');
    expect(returnButton).toBeInTheDocument();
    act(() => userEvent.click(returnButton));
  });

  it('Teste remover admins', async () => {
    const deleteAdmin = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/removeUnitAdmin')
      .reply(200, 'ok')
      .put('/removeUnitAdmin')
      .reply(200, 'ok');

    const listAdminsButton = screen.getByLabelText('Visualizar Admins');
    expect(listAdminsButton).toBeInTheDocument();
    act(() => userEvent.click(listAdminsButton));

    await waitFor(() => expect(getAdmins.isDone()).toBe(true));
    await screen.findByText('Administradores -');

    const makeAdminButton = screen.getAllByLabelText('Deletar')[0];
    expect(makeAdminButton).toBeInTheDocument();
    userEvent.click(makeAdminButton);

    await waitFor(() => expect(deleteAdmin.isDone()).toBe(true));
  });

  it('Teste erro ao adicionar Unidade', async () => {
    const postUnit = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/newUnity')
      .reply(200)
      .post('/newUnity')
      .reply(401, { message: 'Erro ao criar unidade' });

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

    await waitFor(() => expect(postUnit.isDone()).toBe(false));
  });

  it('Teste erro ao criar Unidade', async () => {
    const postUnit = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/newUnity')
      .reply(200)
      .post('/newUnity')
      .reply(400, { message: 'Erro ao criar unidade' });

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

    await waitFor(() => expect(postUnit.isDone()).toBe(false));
  });

  usersResponse.forEach((user) => {
    if (verifyPermissionUnits(user)) {
      it('Adicionar Unidade', async () => {
        localStorage.setItem('user', JSON.stringify(user));
        const postUnit = nock(baseURL)
          .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
          })
          .options('/newUnity')
          .reply(200)
          .post('/newUnity')
          .reply(200, { message: 'Unidade criada' });

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
        await waitFor(() => expect(postUnit.isDone()).toBe(false));
      });
    }
  });
});
