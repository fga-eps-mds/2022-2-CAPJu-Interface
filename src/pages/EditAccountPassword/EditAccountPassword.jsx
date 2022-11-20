import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Container,
  ContainerMenu,
  UserIcon,
  ContainerTitle,
  Criterios
} from './styles';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import user from 'services/user';

function EditAccountPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  async function editPassword() {
    const userPass = JSON.parse(localStorage.getItem('user'));
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/;
    try {
      if (!pass.test(newPassword)) {
        toast.error('Senha não cumpre os criterios');
        return;
      } else {
        if (newPassword == newPassword2) {
          await user.post(`/updateUserPassword/${userPass._id}`, {
            oldPassword,
            newPassword
          });
          toast.success('Senha atualizado com  sucesso');
          setNewPassword('');
          setOldPassword('');
          setNewPassword2('');
        } else {
          toast.error('Confirmação incorreta!');
          return;
        }
      }
    } catch (error) {
      toast.error('Erro ao editar \n' + error.response.data.message);
    }
  }
  return (
    <Container>
      <ContainerTitle>
        <UserIcon />
        <h1>Editar Senha</h1>
      </ContainerTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editPassword();
        }}
      >
        <ContainerMenu>
          <TextInput
            set={setOldPassword}
            value={oldPassword}
            placeholder={'Senha Atual'}
            type="password"
          />
          <TextInput
            set={setNewPassword}
            value={newPassword}
            placeholder={'Nova Senha'}
            type="password"
          />
          <TextInput
            set={setNewPassword2}
            value={newPassword2}
            placeholder={'Confirmar Senha'}
            type="password"
          />
          <Criterios>
            <ul>
              <h6>
                <strong>Critérios para aceitação de senha:</strong>
                <li>Deve conter ao menos um dígito;</li>
                <li>Deve conter ao menos uma letra maiúscula;</li>
                <li>Deve conter ao menos 6 dos caracteres;</li>
              </h6>
            </ul>
          </Criterios>
        </ContainerMenu>
        <Button type="submit">Salvar</Button>
      </form>
    </Container>
  );
}

export default EditAccountPassword;
