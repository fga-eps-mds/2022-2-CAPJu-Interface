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
          <Button text={'Email'} />
        </Link>
        <Link to="senha">
          <Button text={'Senha'} />
        </Link>
      </ContainerMenu>
    </Container>
  );
}

export default EditAccount;
