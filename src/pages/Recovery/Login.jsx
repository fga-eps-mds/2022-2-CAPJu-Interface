import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import user from 'services/user';
import { Container, Modal } from './styles';
import Button from 'components/Button/Button';
import { Content } from 'pages/Stages/styles';
import TextInput from 'components/TextInput/TextInput';

function Login() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const navigate = useNavigate();

  let { hash } = useParams();

  async function updatePassword() {
    if (newPassword != newPassword2) {
      toast.error('Senhas não coincidem');
      return;
    }

    const response = await user.post('/updatePassword', {
      hash,
      newPassword: newPassword
    });
    if (response.status == 200) {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      toast.success('Senha atualizada com sucesso');
      navigate('/Login');
    } else {
      toast.error('Erro ao atualizar senha: ' + response.data?.message);
    }
  }

  return (
    <Container>
      <Content>
        <>
          <h1>Cadastre sua nova senha </h1>
          <TextInput
            set={setNewPassword}
            value={newPassword}
            placeholder="Crie uma nova senha"
            type="password"
          />
          <TextInput
            set={setNewPassword2}
            value={newPassword2}
            placeholder="Confirme a senha"
            type="password"
          />
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            text={'Cadastrar'}
          />
        </>
        {isModalOpen && (
          <Modal>
            <Content>
              <h2>Tem certeza que deseja atualizar sua senha?</h2>
              <Button
                onClick={() => {
                  updatePassword();
                  setModalOpen(false);
                }}
                text={'Confirmar'}
              />
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                background="#DE5353"
                text={'Cancelar'}
              />
            </Content>
          </Modal>
        )}
      </Content>
    </Container>
  );
}

export default Login;
