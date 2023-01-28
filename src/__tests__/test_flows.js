import React from 'react';
import axios from 'axios';
import nock from 'nock';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Flows from 'pages/Flows/Flows';
import { baseURL } from 'services/api';
import { userURL } from 'services/user';
import { flowsResponse, stagesResponse, usersResponse } from 'testConstants';

axios.defaults.adapter = require('axios/lib/adapters/http');
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  };
});

const scopeFlows = nock(baseURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/flows')
  .reply(200, flowsResponse)
  .get('/stages')
  .reply(200, stagesResponse);

const scopeUsers = nock(userURL)
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true'
  })
  .persist()
  .get('/allUser')
  .reply(200, usersResponse);

describe('Testes da pagina de fluxos', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Flows />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(scopeFlows.isDone()).toBe(true);
      expect(scopeUsers.isDone()).toBe(true);
    });
  });

  it('Teste cadastro de fluxo', async () => {
    const scopePost = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/newFlow')
      .reply(200, {
        message: 'Fluxo cadastrado com sucesso'
      });

    const newFlowButton = await screen.findByText('+ Adicionar Fluxo');
    fireEvent.click(newFlowButton);

    const nameLabel = await screen.getByPlaceholderText('Nome do fluxo');
    const nameInput = nameLabel.closest('input');
    let selectBoxes = await screen.findAllByTestId('react-select-mock');
    let addToListButtons = screen.getAllByText('Adicionar');
    const submitButton = screen.getByText('Salvar');

    fireEvent.change(nameInput, {
      target: { value: 'Fluxo de teste' }
    });

    fireEvent.change(selectBoxes[0], {
      target: { value: stagesResponse[2].idStage }
    });
    fireEvent.click(addToListButtons[0]);

    fireEvent.change(selectBoxes[0], {
      target: { value: stagesResponse[1].idStage }
    });
    fireEvent.click(addToListButtons[0]);

    fireEvent.change(selectBoxes[1], {
      target: { value: usersResponse[2].cpf }
    });
    fireEvent.click(addToListButtons[1]);

    selectBoxes = await screen.findAllByTestId('react-select-mock');
    addToListButtons = screen.getAllByText('Adicionar');

    fireEvent.change(selectBoxes[2], {
      target: { value: stagesResponse[2].idStage }
    });
    fireEvent.change(selectBoxes[3], {
      target: { value: stagesResponse[1].idStage }
    });

    fireEvent.click(addToListButtons[2]);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePost.isDone()).toBe(true);
    });
  });

  it('Teste cadastro de fluxo', async () => {
    const scopePost = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/newFlow')
      .reply(400, {
        message: 'Erro ao cadastrar fluxo',
        status: 400
      });

    const newFlowButton = await screen.findByText('+ Adicionar Fluxo');
    fireEvent.click(newFlowButton);

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePost.isDone()).toBe(false);
    });
  });

  it('Teste cancela criação de fluxo', async () => {
    const newFlowButton = await screen.findByText('+ Adicionar Fluxo');
    fireEvent.click(newFlowButton);

    const cancelButton = await screen.findByText('Cancelar');
    fireEvent.click(cancelButton);
  });

  it('Teste fecha modal de criação de fluxo', async () => {
    const newFlowButton = await screen.findByText('+ Adicionar Fluxo');
    fireEvent.click(newFlowButton);

    const closeButton = await screen.findByTestId('close');
    fireEvent.click(closeButton);
  });

  it('Teste edição de fluxo', async () => {
    const scopePut = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/flow')
      .reply(200)
      .put('/flow')
      .reply(200, {
        message: 'Fluxo editado com sucesso'
      });

    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    let selectBoxes = await screen.findAllByTestId('react-select-mock');
    let addToListButtons = screen.getAllByText('Adicionar');
    const submitButton = screen.getByText('Salvar');
    const removeButtons = screen.getAllByText('x');

    fireEvent.change(selectBoxes[1], {
      target: { value: usersResponse[2].cpf }
    });
    fireEvent.click(addToListButtons[1]);

    selectBoxes = await screen.findAllByTestId('react-select-mock');
    addToListButtons = screen.getAllByText('Adicionar');

    fireEvent.change(selectBoxes[2], {
      target: { value: stagesResponse[3].idStage }
    });
    fireEvent.change(selectBoxes[3], {
      target: { value: stagesResponse[2].idStage }
    });

    fireEvent.click(addToListButtons[2]);
    fireEvent.click(removeButtons[0].closest('div'));
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePut.isDone()).toBe(true);
    });
  });

  it('Teste erro na edição de fluxo', async () => {
    const scopePut = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/flow')
      .reply(200)
      .put('/flow')
      .reply(400);

    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePut.isDone()).toBe(false);
    });
  });

  it('Teste usuário não possui permissão para editar fluxo', async () => {
    const scopePut = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/flow')
      .reply(200)
      .put('/flow')
      .reply(401, { message: 'Mensgem de erro' });

    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePut.isDone()).toBe(false);
    });
  });

  it('Teste cancela edição de fluxo', async () => {
    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const cancelButton = await screen.findByText('Cancelar');
    fireEvent.click(cancelButton);
  });

  it('Teste fecha modal de edição de fluxo', async () => {
    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const closeButton = await screen.findByTestId('close');
    fireEvent.click(closeButton);
  });

  it('Teste exclusão de fluxo', async () => {
    const scopeDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(`/flow/${stagesResponse[1].idStage}`)
      .reply(200)
      .delete(`/flow/${stagesResponse[1].idStage}`)
      .reply(200, {
        message: 'Fluxo excluído com sucesso'
      });

    const deleteButtons = await screen.findAllByLabelText('Deletar fluxo');
    fireEvent.click(deleteButtons[1]);

    const confirmButton = await screen.findByText('Confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(scopeDelete.isDone()).toBe(true);
    });
  });

  it('Teste erro na exclusão de fluxo', async () => {
    const scopeDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options(`/flow/${stagesResponse[1].idStage}`)
      .reply(200)
      .delete(`/flow/${stagesResponse[1].idStage}`)
      .reply(400);

    const deleteButtons = await screen.findAllByLabelText('Deletar fluxo');
    fireEvent.click(deleteButtons[1]);

    const confirmButton = await screen.findByText('Confirmar');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(scopeDelete.isDone()).toBe(false);
    });
  });

  it('Teste cancela exclusão de fluxo', async () => {
    const scopeDelete = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/deleteFlow')
      .reply(200, {
        message: 'Fluxo excluído com sucesso'
      });

    const deleteButtons = await screen.findAllByLabelText('Deletar fluxo');
    fireEvent.click(deleteButtons[1]);

    const cancelButton = await screen.findByText('Cancelar');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(scopeDelete.isDone()).toBe(false);
    });
  });

  it('Teste remover sequencia de um fluxo', async () => {
    const scopePut = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/flow')
      .reply(200)
      .put('/flow')
      .reply(200, {
        message: 'Fluxo editado com sucesso'
      });

    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const removeSequenceButton = screen.getByText('Remover');
    fireEvent.click(removeSequenceButton);

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(scopePut.isDone()).toBe(true);
    });
  });

  it('Adicionar sequências invalidas', async () => {
    const scopePut = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .options('/flow')
      .reply(200)
      .put('/flow')
      .reply(200, {
        message: 'Fluxo editado com sucesso'
      });

    const editButtons = await screen.findAllByLabelText('Editar fluxo');
    fireEvent.click(editButtons[0]);

    const selectBoxes = await screen.findAllByTestId('react-select-mock');
    const addToListButtons = screen.getAllByText('Adicionar');

    fireEvent.change(selectBoxes[2], {
      target: { value: stagesResponse[3].idStage }
    });
    fireEvent.change(selectBoxes[3], {
      target: { value: stagesResponse[3].idStage }
    });
    fireEvent.click(addToListButtons[2]);

    await waitFor(() => {
      const toastr = screen.findByTestId('toastr');
      expect(toastr).not.toBe(null);
    });

    fireEvent.change(selectBoxes[2], {
      target: { value: stagesResponse[0].idStage }
    });
    fireEvent.change(selectBoxes[3], {
      target: { value: stagesResponse[1].idStage }
    });
    fireEvent.click(addToListButtons[2]);

    await waitFor(() => {
      const toastr = screen.findByTestId('toastr');
      expect(toastr).not.toBe(null);
    });

    const removeSequenceButton = screen.getByText('Remover');
    fireEvent.click(removeSequenceButton);

    const submitButton = screen.getByText('Salvar');
    fireEvent.click(submitButton);
  });

  it(`Testando criar fluxo no componente Flows`, async () => {
    localStorage.setItem('user', JSON.stringify(usersResponse[0]));
    const scope = nock(baseURL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true'
      })
      .post('/newFlow')
      .reply(200, 'Fluxo criado com sucesso');

    const buttonFlow = screen.getByText('+ Adicionar Fluxo');
    fireEvent.click(buttonFlow);
    const modalName = screen.getByText('Novo Fluxo');
    const inputFlow = screen.getByPlaceholderText('Nome do fluxo');
    const button = screen.getByText('Salvar');
    const close = screen.getByText('Cancelar');
    fireEvent.change(inputFlow, { target: { value: 'perito' } });
    fireEvent.click(button);
    fireEvent.click(close);

    expect(modalName).toHaveTextContent('Novo Fluxo');

    await waitFor(() => expect(scope.isDone()).toBe(true));
  });
});
