import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { baseURL } from 'services/api';
import Stages from 'pages/Stages/Stages';
import { Permissions } from 'util/permissionChecker';
import { stagesResponse, usersResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

function verifyPermission(user) {
  if (
    user.idRole == Permissions.DIRETOR ||
    user.idRole == Permissions.SERVIDOR ||
    user.idRole == Permissions.ADMINISTRADOR
  ) {
    return true;
  } else return false;
}

usersResponse.forEach((user) => {
  if (verifyPermission(user)) {
    test('Testando criar etapa no componente Stages', async () => {
      localStorage.setItem('user', JSON.stringify(user));
      const scopeGetStage = nock(baseURL)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true'
        })
        .persist()
        .get('/stages')
        .reply(200, stagesResponse);

      const scopePostStage = nock(baseURL)
        .defaultReplyHeaders({
          'access-control-allow-origin': '*',
          'access-control-allow-credentials': 'true'
        })
        .post('/newStage')
        .reply(200);

      render(<Stages />);

      const button = screen.getByText('+ Adicionar Etapa');
      fireEvent.click(button);

      const modalName = screen.getByText('Criar Etapa');
      const inputName = screen.getByPlaceholderText('Nome da etapa');
      const inputduration = screen.getByPlaceholderText('Duração (dias)');
      const button1 = screen.getByText('Salvar');

      fireEvent.change(inputName, { target: { value: 'Perito' } });
      fireEvent.change(inputduration, { target: { value: '1' } });
      expect(modalName).toHaveTextContent('Criar Etapa');
      fireEvent.click(button1);

      await waitFor(() => expect(scopeGetStage.isDone()).toBe(true));
      await waitFor(() => expect(scopePostStage.isDone()).toBe(true));

      expect(screen.queryByText('Criar Etapa')).toBe(null);
      nock.cleanAll();
    });
  }
});

test('Testando deletar etapa', async () => {
  localStorage.setItem('user', JSON.stringify(usersResponse[0]));

  const scopeGetStage = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })

    .get('/stages')
    .reply(200, stagesResponse);

  const scopeDelete = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .options(`/deleteStage/${stagesResponse[0].idStage}`)
    .reply(200, null);
  render(<Stages />);

  const deleteIcon = screen.getByTestId('DeleteForeverIcon');
  fireEvent.click(deleteIcon);

  const deleteButton = screen.getByText('Excluir');
  fireEvent.click(deleteButton);
  await expect(scopeDelete.isDone()).toBe(false);
  await waitFor(() => expect(scopeGetStage.isDone()).toBe(true));
});

test('Testando erro ao deletar etapa', async () => {
  localStorage.setItem('user', JSON.stringify(usersResponse[2]));

  const scopeGetStage = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .get('/stages')
    .reply(401, stagesResponse);

  await waitFor(() => expect(scopeGetStage.isDone()).toBe(false));
});

afterAll(() => nock.restore());
