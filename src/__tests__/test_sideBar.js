import React from 'react';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';

import { userURL } from 'services/user';
import { loggedUser, usersResponse } from 'testConstants';
import SideBar from 'components/SideBar/Sidebar';

describe('Testando SideBar', () => {
  it('Testando se o componente carrega todo o conteúdo', async () => {
    const getUsers = nock(userURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .persist()
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
});
