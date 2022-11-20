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

axios.defaults.adapter = require('axios/lib/adapters/http');

// mock window.location.reload()
delete window.location;
window.location = { reload: jest.fn() };

test('Testando criar Login no componente Login', async () => {
  const loginData = { email: 'test@test.com', password: '123456' };

  const scopeLogin = nock(userURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .post('/login', loginData)
    .reply(200, {
      _id: 'askljsf',
      name: 'test',
      email: loginData.email,
      token: 'Bearer sdlksadkçlfdjalo'
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

  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Stages" element={<Stages />} />
      </Routes>
    </MemoryRouter>
  );

  const title = screen.getByRole('heading', { level: 1 });
  const inputEmail = screen.getByPlaceholderText('Email');
  const inputPassword = screen.getByPlaceholderText('Senha');
  const button1 = screen.getByText('Entrar');

  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.change(inputPassword, { target: { value: '123456' } });
  expect(title).toHaveTextContent('Login');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeLogin.isDone()).toBe(true), {
    timeout: 1000
  });
  expect(screen.queryByText('Login')).toBe(null);
});

afterAll(() => nock.restore());
