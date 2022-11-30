import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Container,
  ContainerMenu,
  UserIcon,
  ContainerTitle,
  Criterios
} from './styles';
import user from 'services/user';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

function EditAccountEmail() {
  const [newEmail, setNewEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');

  async function editEmail() {
    const userEmail = JSON.parse(localStorage.getItem('user'));
    const re = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/;

    try {
      if (oldEmail == userEmail.email && newEmail !== userEmail.email) {
        if (!re.test(newEmail)) {
          toast.error('E-mail Inválido');
          return;
        }
        await user.put(`/updateUser/${userEmail._id}`, {
          email: newEmail
        });
        toast.success('Email atualizado com  sucesso');
        setNewEmail('');
        setOldEmail('');
      } else {
        toast.error('Email atual inválido!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Email</h1>
      </ContainerTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editEmail();
        }}
      >
        <ContainerMenu>
          <TextInput
            set={setOldEmail}
            value={oldEmail}
            placeholder="Email Atual"
          />
          <TextInput
            set={setNewEmail}
            value={newEmail}
            placeholder="Email Novo"
          />
          <Criterios>
            <ul>
              <h6>
                <strong>Critérios para aceitação de email:</strong>
                <li>Deve conter os caracteres @ e . </li>
              </h6>
            </ul>
          </Criterios>
        </ContainerMenu>
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default EditAccountEmail;
