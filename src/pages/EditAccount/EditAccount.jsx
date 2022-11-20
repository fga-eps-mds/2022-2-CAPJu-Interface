import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  ContainerMenu,
  UserIcon,
  ContainerTitle,
  NameTitle
} from './styles';

import Button from 'components/Button/Button';

function EditAccount() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Conta</h1>
      </ContainerTitle>
      <NameTitle>{user.name}</NameTitle>
      <ContainerMenu>
        <Link to="email">
          <Button>
            <span>Email</span>
          </Button>
        </Link>
        <Link to="senha">
          <Button>
            <span>Senha</span>
          </Button>
        </Link>
      </ContainerMenu>
    </Container>
  );
}

export default EditAccount;
