import React from 'react';
import nock from 'nock';
import axios from 'axios';
import '@testing-library/jest-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { baseURL } from 'services/api';
import Stages from 'pages/Stages/Stages';

axios.defaults.adapter = require('axios/lib/adapters/http');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

test('Testando criar etapa no componente Stages', async () => {
  const stageData = { name: 'Perito', time: '15' };

  const scopeGet = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .persist()
    .get('/stages')
    .reply(200, {
      Stages: [
        { name: 'per', time: '18', _id: 'foo' },
        { name: 'natal', time: '16', _id: 'foo' },
        { name: 'ano novo', time: '17', _id: 'foo' }
      ]
    });
  const scopePost = nock(baseURL)
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true'
    })
    .post('/newStage', stageData)
    .reply(200, { ...stageData, deleted: false });

  render(<Stages />);

  const button = screen.getByText('+ Adicionar Etapa');
  fireEvent.click(button);

  const modalName = screen.getByText('Criar Etapa');
  const inputName = screen.getByPlaceholderText('Nome da etapa');
  const inputTime = screen.getByPlaceholderText('Duração (dias)');
  const button1 = screen.getByText('Salvar');

  fireEvent.change(inputName, { target: { value: 'Perito' } });
  fireEvent.change(inputTime, { target: { value: '15' } });
  expect(modalName).toHaveTextContent('Criar Etapa');
  fireEvent.click(button1);
  await waitFor(() => expect(scopeGet.isDone()).toBe(true));
  await waitFor(() => expect(scopePost.isDone()).toBe(true));
  expect(screen.queryByText('Criar Etapa')).toBe(null);
});

afterAll(() => nock.restore());
