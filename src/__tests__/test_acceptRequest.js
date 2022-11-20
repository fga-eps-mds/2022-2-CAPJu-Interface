import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { userURL } from 'services/user.js';
import SolicitacoesCadastro from 'pages/SolicitacoesCadastro/SolicitacoesCadastro';

const user = {
  user: [
    {
      _id: '3049304932093',
      name: 'Cleber',
      email: 'cleber@gmail.com',
      password: 'ijj2pei9ue39ej3d9dj30',
      accepted: false,
      createdAt: '2022-08-24T14:17:42.934Z',
      unity: '6325329e78f4b09d6082232f',
      role: 1,
      unityAdmin: '6325329e78f4b09d6082232f',
      updatedAt: '2022-09-14T15:27:59.428Z',
      __v: 0,
      recoveryDate: '2022-09-01T16:42:00.913Z',
      recoveryHash:
        '0f85ff4b6ad7c46055f49c010fb90389b31977a1833e0f43cfeb09b45684ec7f'
    }
  ]
};

const setLocalStorage = (user, data) => {
  window.localStorage.setItem(user, JSON.stringify(data));
};

beforeAll(() => {
  setLocalStorage('user', user.user[0]);
});

const scopeRequest = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=false')
  .reply(200, user);

const scopeAllUsers = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=true')
  .reply(200, user);

test('Testando aceitar solicitação', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<SolicitacoesCadastro />} />
      </Routes>
    </MemoryRouter>
  );
  await waitFor(
    () => {
      expect(scopeRequest.isDone()).toBe(true);
      expect(scopeAllUsers.isDone()).toBe(true);
    },
    {
      timeout: 8000
    }
  );

  screen.getByText('Solicitações de Cadastro');

  //Aceitando Solicitação
  const scopeAccept = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post(`/acceptRequest/${user.user[0]._id}`)
    .reply(200, null);

  const acceptButton = screen.getByLabelText('Aceitar solicitação');
  fireEvent.click(acceptButton);
  const acceptConfirmButton = screen.getByText('Confirmar');
  fireEvent.click(acceptConfirmButton);
  await waitFor(() => expect(scopeAccept.isDone()).toBe(true));

  // //Deletando solicitação
  const scopeDelete = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(`/deleteRequest/${user.user[0]._id}`)
    .reply(200, null)
    .delete(`/deleteRequest/${user.user[0]._id}`)
    .reply(200, null);

  const deleteButton = screen.getByLabelText('Recusar solicitação');
  fireEvent.click(deleteButton);
  const deleteConfirmButton = screen.getByText('Confirmar');
  fireEvent.click(deleteConfirmButton);
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));

  //Cancelando Confirmação de Aceitação
  fireEvent.click(acceptButton);
  const cancelAcceptButton = screen.getByText('Cancelar');
  fireEvent.click(cancelAcceptButton);

  //Cancelando Confiramação de Deleção
  fireEvent.click(deleteButton);
  const cancelDeleteButton = screen.getByText('Cancelar');
  fireEvent.click(cancelDeleteButton);
  screen.getByText('Solicitações de Cadastro');
});
afterAll(() => nock.restore());
