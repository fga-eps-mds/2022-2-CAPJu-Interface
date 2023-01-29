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

localStorage.setItem('user', JSON.stringify(usersResponse[0]));

const scopeGet = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser')
  .reply(200, usersResponse);

describe('Teste Perfil de Acesso', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={['/accessProfile']}>
        <Routes>
          <Route path="/accessProfile" element={<AccessProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  });

  it('Teste deletar um usuário', async () => {
    const deleteURL = `/deleteUser/${usersResponse[2].cpf}`;
    const scopeDelete = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(deleteURL)
      .reply(200, null)
      .delete(deleteURL)
      .reply(200);

    const deleteIcon = await screen.getAllByLabelText('Deletar Usuário');
    fireEvent.click(deleteIcon[1]);

    const modalName = screen.getByText('Excluir Usuário');
    const buttonDelete = screen.getByText('Confirmar');
    fireEvent.click(buttonDelete);
    expect(modalName).toHaveTextContent('Excluir Usuário');
    await waitFor(() => expect(scopeDelete.isDone()).toBe(true));
  });

  it('Teste editar perfil de acesso de um usuário', async () => {
    const scopeEdit = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateUserRole')
      .reply(200, null)
      .put('/updateUserRole')
      .reply(200, {
        result: 'Deletado com sucesso'
      });

    const role = await screen.findByText('Juiz');
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

  it('Teste cancelar exclusão', async () => {
    const deleteIcon = await screen.findAllByLabelText('Deletar Usuário');
    fireEvent.click(deleteIcon[1]);

    const buttonClose = screen.getByText('Cancelar');
    fireEvent.click(buttonClose);
  });

  it('Teste cancelar edição', async () => {
    const editIcon = await screen.findAllByLabelText('Editar perfil');
    fireEvent.click(editIcon[1]);

    const buttonClose = screen.getByText('Cancelar');
    fireEvent.click(buttonClose);
  });

  it('Teste pesquisa de usuário', async () => {
    const searchInput = await screen.findByPlaceholderText('Buscar Usuário');
    const users = await screen.findAllByText(/ca/);
    expect(users).toHaveLength(2);

    fireEvent.change(searchInput, {
      target: { value: 'Marcio' }
    });
    expect(searchInput).toHaveValue('Marcio');

    const filteredUsers = await screen.findAllByText(/ca/);
    expect(filteredUsers).toHaveLength(1);
  });

  it('Teste falta de permissao para edição de perfil', async () => {
    const scopeFailedEdit = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateUserRole')
      .reply(200, null)
      .put('/updateUserRole')
      .reply(401, {
        message: 'Erro ao editar perfil'
      });

    const editIcon = await screen.findAllByTestId('EditIcon');
    fireEvent.click(editIcon[2]);

    const buttonEdit = screen.getByText('Salvar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedEdit.isDone()).toBe(true));
  });

  it('Teste alteração sem dados', async () => {
    const scopeFailedEdit = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateUserRole')
      .reply(200, null)
      .put('/updateUserRole')
      .reply(205, null);

    const editIcon = await screen.findAllByTestId('EditIcon');
    fireEvent.click(editIcon[2]);

    const buttonEdit = screen.getByText('Salvar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedEdit.isDone()).toBe(true));
  });

  it('Teste erro ao modificar perfil', async () => {
    const scopeFailedEdit = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/updateUserRole')
      .reply(200, null)
      .put('/updateUserRole')
      .reply(400, null);

    const editIcon = await screen.findAllByTestId('EditIcon');
    fireEvent.click(editIcon[2]);

    const buttonEdit = screen.getByText('Salvar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedEdit.isDone()).toBe(true));
  });

  it('Teste falha em deletar usuário', async () => {
    const deleteURL = `/deleteUser/${usersResponse[3].cpf}`;
    const scopeFailedDelete = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(deleteURL)
      .reply(200)
      .delete(deleteURL)
      .reply(500, {
        message: 'Erro ao deletar Usuário'
      });

    const deleteIcon = await screen.findAllByLabelText('Deletar Usuário');
    fireEvent.click(deleteIcon[2]);

    const buttonEdit = screen.getByText('Confirmar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedDelete.isDone()).toBe(true));
  });

  it('Teste erro ao deletar Usuário', async () => {
    const deleteURL = `/deleteUser/${usersResponse[3].cpf}`;
    const scopeFailedDelete = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(deleteURL)
      .reply(200)
      .delete(deleteURL)
      .reply(400, {
        message: 'Erro ao deletar Usuário'
      });

    const deleteIcon = await screen.findAllByLabelText('Deletar Usuário');
    fireEvent.click(deleteIcon[2]);

    const buttonEdit = screen.getByText('Confirmar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedDelete.isDone()).toBe(true));
  });

  it('Teste falta de permissão para deletar Usuário', async () => {
    const deleteURL = `/deleteUser/${usersResponse[3].cpf}`;
    const scopeFailedDelete = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(deleteURL)
      .reply(200)
      .delete(deleteURL)
      .reply(401, {
        message: 'Erro ao deletar Usuário'
      });

    const deleteIcon = await screen.findAllByLabelText('Deletar Usuário');
    fireEvent.click(deleteIcon[2]);

    const buttonEdit = screen.getByText('Confirmar');
    fireEvent.click(buttonEdit);
    await waitFor(() => expect(scopeFailedDelete.isDone()).toBe(true));
  });
});
