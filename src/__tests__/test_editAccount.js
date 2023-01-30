import React from 'react';
import axios from 'axios';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { userURL } from 'services/user';
import EditAccountEmail from 'pages/EditAccountEmail/EditAccountEmail';
import EditAccountPassword from 'pages/EditAccountPassword/EditAccountPassword';
import { usersResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const setLocalStorage = (user, data) => {
  window.localStorage.setItem(user, JSON.stringify(data));
};

beforeAll(() => {
  setLocalStorage('user', usersResponse[0]);
});

test('Testando edição de Email do componente editAccountEmail', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<EditAccountEmail />} />
      </Routes>
    </MemoryRouter>
  );

  screen.getByText('Editar Email');

  const emailAtualTextInput = screen.getByPlaceholderText('Email Atual');
  const emailNovoTextInput = screen.getByPlaceholderText('Email Novo');
  const salvarButton = screen.getByText('Salvar');

  fireEvent.change(emailAtualTextInput, {
    target: { value: 'teste@email.com' }
  });
  fireEvent.change(emailNovoTextInput, {
    target: { value: 'editTest@email.com' }
  });
  fireEvent.click(salvarButton);
});

test('Testando edição de senha do componente editAccountPassword', async () => {
  const scopeEditPassword = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post(`/updateUserPassword/${usersResponse[0].cpf}`)
    .reply(200, usersResponse[0]);

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<EditAccountPassword />} />
      </Routes>
    </MemoryRouter>
  );

  screen.getByText('Editar Senha');

  const senhaAtualTextInput = screen.getByPlaceholderText('Senha Atual');
  const senhaNovoTextInput = screen.getByPlaceholderText('Nova Senha');
  const senha2TextInput = screen.getByPlaceholderText('Confirmar Senha');
  const salvarButton = screen.getByText('Salvar');

  fireEvent.change(senhaAtualTextInput, {
    target: { value: 'Test123' }
  });
  fireEvent.change(senhaNovoTextInput, {
    target: { value: '123Teste' }
  });
  fireEvent.change(senha2TextInput, {
    target: { value: '123Teste' }
  });
  fireEvent.click(salvarButton);

  await waitFor(() => expect(scopeEditPassword.isDone()).toBe(true), {
    timeout: 1000
  });
});

afterAll(() => nock.restore());
