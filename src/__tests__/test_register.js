import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import Login from 'pages/Login/Login';
import { userURL } from 'services/user';
import { baseURL } from 'services/api';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});
// jest.setTimeout(8000);
test('Testando o cadastro', async () => {
  const registerData = {
    name: 'João',
    email: 'test@test.com',
    password: 'SenhaForte1',
    role: '1',
    unity: '12341234ldlfasdf'
  };

  const scopeCadastro = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/newUser', registerData)
    .reply(200, {
      _id: 'askljsf',
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      token: 'Bearer sdlksadkçlfdjalo',
      unity: '12341234ldlfasdf',
      role: registerData.role
    });

  const scopeUnities = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/unitys')
    .reply(200, {
      Unitys: [
        {
          name: 'Peritos',
          _id: '12341234ldlfasdf'
        }
      ]
    });

  render(<Login />);

  await waitFor(() => expect(scopeUnities.isDone()).toBe(true), {
    timeout: 1000
  });

  const button = screen.getByText('Cadastro');
  fireEvent.click(button);

  const title = screen.getByRole('heading', { level: 1 });
  const inputName = screen.getByPlaceholderText('Nome completo');
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Crie uma senha');
  const inputCheckPassword = screen.getByPlaceholderText('Confirme a senha');
  const select = screen.getAllByTestId('react-select-mock');
  const button1 = screen.getByText('Cadastrar');

  fireEvent.change(inputName, { target: { value: registerData.name } });
  fireEvent.change(inputEmail, { target: { value: registerData.email } });
  fireEvent.change(inputPassword, { target: { value: registerData.password } });
  fireEvent.change(inputCheckPassword, {
    target: { value: registerData.password }
  });
  fireEvent.change(select[0], { target: { value: registerData.role } });
  fireEvent.change(select[1], { target: { value: registerData.unity } });

  expect(title).toHaveTextContent('Cadastre-se');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeCadastro.isDone()).toBe(true), {
    timeout: 1000
  });
  expect(screen.queryByText('Cadastre-se')).toBe(null);
});

afterAll(() => nock.restore());
