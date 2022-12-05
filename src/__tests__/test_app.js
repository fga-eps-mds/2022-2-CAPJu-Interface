import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { loggedUser } from 'testConstants';
import App from 'App';

describe('Testando carregamento do aplicativo', () => {
  it('Testando carregamento do aplicativo', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  it('Testando carregamento do aplicativo com usuário logado', () => {
    localStorage.setItem('user', JSON.stringify(loggedUser));
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });
});
