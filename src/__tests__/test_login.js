import React from 'react';
import axios from 'axios';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import Login from 'pages/Login/Login';
import Stages from 'pages/Stages/Stages';
import { userURL } from 'services/user';
import { baseURL } from 'services/api';
import { units } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

// mock window.location.reload()
delete window.location;
window.location = { reload: jest.fn() };

test('Testando criar Login no componente Login', async () => {
  const loginData = { cpf: '413.411.140-40', password: 'Senha@123456789' };

  const scopeLogin = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/login', loginData)
    .reply(200);

  const scopeUnits = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/units')
    .reply(200, units);

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Stages" element={<Stages />} />
      </Routes>
    </MemoryRouter>
  );

  const title = screen.getByRole('heading', { level: 1 });
  const inputCpf = screen.getByPlaceholderText('CPF');
  const inputPassword = screen.getByPlaceholderText('Senha');
  const button1 = screen.getByText('Entrar');

  fireEvent.change(inputCpf, { target: { value: '413.411.140-40' } });
  fireEvent.change(inputPassword, { target: { value: 'Senha@123456789' } });
  expect(title).toHaveTextContent('Login');
  fireEvent.click(button1);
  await waitFor(() => {
    expect(scopeLogin.isDone()).toBe(true);
    expect(scopeUnits.isDone()).toBe(true);
  });
  expect(screen.queryByText('Login')).toBe(null);
});

afterAll(() => nock.restore());
