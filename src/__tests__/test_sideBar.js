import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import Login from 'pages/Login/Login';
import { userURL } from 'services/user';
import { baseURL } from 'services/api';
import { units, loggedUser, usersResponse } from 'testConstants';
import SideBar from 'components/SideBar/Sidebar';

describe('Testando SideBar', () => {
  it('Testando se o componente carrega todo o conteúdo', async () => {
    const getUsers = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(/allUser/)
      .reply(200, usersResponse);

    localStorage.setItem('user', JSON.stringify(loggedUser[0]));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SideBar />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(getUsers.isDone()).toBe(true));

    await waitFor(() => {
      expect(screen.getByText('Unidades')).toBeInTheDocument();
      expect(screen.getByText('Etapas')).toBeInTheDocument();
      expect(screen.getByText('Fluxos')).toBeInTheDocument();
      expect(screen.getByText('Processos')).toBeInTheDocument();
      expect(screen.getByText('Solicitações')).toBeInTheDocument();
      expect(screen.getByText('Perfil de Acesso')).toBeInTheDocument();
      expect(screen.getByText('Editar Conta')).toBeInTheDocument();
      expect(screen.getByText('Sair')).toBeInTheDocument();
    });

    const unitsButton = screen.getByText('Unidades');
    const stagesButton = screen.getByText('Etapas');
    const flowsButton = screen.getByText('Fluxos');
    const processesButton = screen.getByText('Processos');
    const requestsButton = screen.getByText('Solicitações');
    const accessProfileButton = screen.getByText('Perfil de Acesso');
    const editAccountButton = screen.getByText('Editar Conta');

    expect(unitsButton.closest('a')).toHaveAttribute('href', '/unidades');
    expect(stagesButton.closest('a')).toHaveAttribute('href', '/stages');
    expect(flowsButton.closest('a')).toHaveAttribute('href', '/');
    expect(requestsButton.closest('a')).toHaveAttribute(
      'href',
      '/solicitacoes'
    );
    expect(accessProfileButton.closest('a')).toHaveAttribute(
      'href',
      '/accessProfile'
    );
    expect(editAccountButton.closest('a')).toHaveAttribute(
      'href',
      '/editAccount'
    );
    expect(processesButton.closest('a')).toHaveAttribute('href', '/processes');
  });

  it('Testando logout do sistema', async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const getUsers = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get(/allUser/)
      .reply(200, usersResponse);

    const scopeUnits = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .get('/units')
      .reply(200, units);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SideBar />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const logoutButton = await screen.getByText('Sair');
    fireEvent.click(logoutButton);
    expect(localStorage.getItem('user')).toBe(null);

    await waitFor(() => {
      expect(getUsers.isDone()).toBe(true);
      expect(scopeUnits.isDone()).toBe(true);
    });
  });
});
