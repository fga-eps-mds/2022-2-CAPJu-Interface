import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import Login from 'pages/Login/Login';
import { userURL } from 'services/user';
import { baseURL } from 'services/api';
import { units, usersResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando o cadastro', async () => {
  const scopeCadastro = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newUser')
    .reply(200);

  const scopeUnities = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/units')
    .reply(200, units);

  render(<Login />);

  await waitFor(() => expect(scopeUnities.isDone()).toBe(true));

  const button = screen.getByText('Cadastro');
  fireEvent.click(button);

  const title = screen.getByRole('heading', { level: 1 });
  const inputName = screen.getByPlaceholderText('Nome completo');
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputCpf = screen.getByPlaceholderText('CPF');
  const inputPassword = screen.getByPlaceholderText('Crie uma senha');
  const inputCheckPassword = screen.getByPlaceholderText('Confirme a senha');
  const select = screen.getAllByTestId('react-select-mock');
  const button1 = screen.getByText('Cadastrar');

  fireEvent.change(inputName, { target: { value: usersResponse[0].fullName } });
  fireEvent.change(inputEmail, { target: { value: usersResponse[0].email } });
  fireEvent.change(inputCpf, { target: { value: usersResponse[0].cpf } });
  fireEvent.change(inputPassword, {
    target: { value: '123Teste' }
  });
  fireEvent.change(inputCheckPassword, {
    target: { value: '123Teste' }
  });
  fireEvent.change(select[0], { target: { value: usersResponse[0].idRole } });
  fireEvent.change(select[1], { target: { value: usersResponse[0].idUnit } });

  expect(title).toHaveTextContent('Cadastre-se');
  fireEvent.click(button1);

  await waitFor(() => expect(scopeCadastro.isDone()).toBe(true));
  expect(screen.queryByText('Cadastre-se')).toBe(null);
});

afterAll(() => nock.restore());
