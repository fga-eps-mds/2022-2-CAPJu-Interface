import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react';

import { userURL } from 'services/user.js';
import SolicitacoesCadastro from 'pages/SolicitacoesCadastro/SolicitacoesCadastro';
import { loggedUser } from 'testConstants';

beforeAll(() => {
  localStorage.setItem('user', JSON.stringify(loggedUser[0]));
});

const scopeRequest = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=false')
  .reply(200, loggedUser);

const scopeAllUsers = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser?accepted=true')
  .reply(200, loggedUser);

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

  screen.findByText('Solicitações de Cadastro');

  //Aceitando Solicitação
  const scopeAccept = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post(`/acceptRequest/${loggedUser[0].cpf}`)
    .reply(200, null);

  const acceptButton = await screen.findByLabelText('Aceitar solicitação');
  act(() => fireEvent.click(acceptButton));
  const acceptConfirmButton = screen.getByText('Confirmar');
  fireEvent.click(acceptConfirmButton);
  await waitFor(() => expect(scopeAccept.isDone()).toBe(true));

  // //Deletando solicitação
  const scopeDelete = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(`/deleteRequest/${loggedUser[0].cpf}`)
    .reply(200, null)
    .delete(`/deleteRequest/${loggedUser[0].cpf}`)
    .reply(200, null);

  const deleteButton = screen.getByLabelText('Recusar solicitação');
  fireEvent.click(deleteButton);
  const deleteConfirmButton = screen.getAllByText('Confirmar');
  const confirmButton = deleteConfirmButton.pop();
  fireEvent.click(confirmButton);
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));

  //Cancelando Confirmação de Aceitação
  fireEvent.click(acceptButton);
  const cancelAcceptButton = await screen.findByText('Cancelar');
  act(() => cancelAcceptButton.click());

  //Cancelando Confiramação de Deleção
  fireEvent.click(deleteButton);
  const cancelDeleteButton = await screen.findByText('Cancelar');
  act(() => cancelDeleteButton.click());
  screen.getByText('Solicitações de Cadastro');
});
afterAll(() => nock.restore());
