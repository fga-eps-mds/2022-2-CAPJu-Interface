import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { userURL } from 'services/user';
import { usersResponse } from 'testConstants';
import AccessProfile from 'pages/AccessProfile/AccessProfile';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const scopeGet = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser')
  .reply(200, usersResponse);

localStorage.setItem('user', JSON.stringify(usersResponse.user[0]));

test('Testando deletar um usuário', async () => {
  const users = usersResponse.user[1];
  const deleteURL = `/deleteRequest/${users._id}`;
  const scopeDelete = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .options(deleteURL)
    .reply(200, null)
    .delete(deleteURL)
    .reply(200, {
      result: 'Deletado com sucesso'
    });

  render(
    <MemoryRouter initialEntries={['/accessProfile']}>
      <Routes>
        <Route path="/accessProfile" element={<AccessProfile />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(scopeGet.isDone()).toBe(true), { timeout: 1000 });

  const deleteIcon = await screen.findAllByTestId('DeleteForeverIcon');
  fireEvent.click(deleteIcon[1]);

  const modalName = screen.getByText('Excluir Usuário');
  const buttonDelete = screen.getByText('Confirmar');
  fireEvent.click(buttonDelete);
  expect(modalName).toHaveTextContent('Excluir Usuário');
  await waitFor(() => expect(scopeDelete.isDone()).toBe(true));
});

test('Testando editar perfil de acesso de um usuário', async () => {
  const scopeEdit = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .options('/updateRole')
    .reply(200, null)
    .put('/updateRole')
    .reply(200, {
      result: 'Deletado com sucesso'
    });

  render(
    <MemoryRouter initialEntries={['/accessProfile']}>
      <Routes>
        <Route path="/accessProfile" element={<AccessProfile />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => expect(scopeGet.isDone()).toBe(true), { timeout: 1000 });
  const role = await screen.findByText('Juíz');
  expect(role).toBeInTheDocument();

  const editIcon = await screen.findAllByTestId('EditIcon');
  fireEvent.click(editIcon[2]);
  const modalEdit = screen.getByText('Editar Perfil de Acesso');
  const dropdown = screen.getByTestId('react-select-mock');
  fireEvent.change(dropdown, {
    target: { value: 4 }
  });
  const buttonEdit = screen.getByText('Salvar');
  fireEvent.click(buttonEdit);
  expect(modalEdit).toHaveTextContent('Editar Perfil de Acesso');
  await waitFor(() => expect(scopeEdit.isDone()).toBe(true));
});
