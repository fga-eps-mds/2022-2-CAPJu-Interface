import React from 'react';
import toast from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from 'services/api';
import user from 'services/user';
import {
  Container,
  Menu,
  MenuElement,
  Modal,
  ForgotPassword,
  Criterios,
  EditDrop
} from './styles';
import { Content } from 'pages/Stages/styles';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';

function Login() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [unitys, setUnitys] = useState([]);
  const [newUnity, setNewUnity] = useState('');

  const [selectedTab, setSelectedTab] = useState('login');

  const navigate = useNavigate();
  useEffect(() => {
    updateUnitys();
  }, []);
  async function register() {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{6,}$/;
    console.log(newEmail, re.test(newEmail));
    if (!re.test(newEmail)) {
      toast.error('E-mail Inválido');
      return;
    }
    console.log(newPassword, pass.test(newPassword));
    if (!pass.test(newPassword)) {
      toast.error('Senha não cumpre os criterios');
      return;
    }
    if (newPassword != newPassword2) {
      toast.error('Senha invalida');
      return;
    }

    try {
      const response = await user.post('/newUser', {
        name: newName,
        email: newEmail,
        password: newPassword,
        role: newRole,
        unity: newUnity
      });
      response.status == 200;
      toast.success('Usuário cadastrado com  sucesso');
      setNewName('');
      setNewPassword('');
      setNewEmail('');
      setNewPassword2('');
      setSelectedTab('login');
      setNewRole('');
      setNewUnity('');
    } catch (error) {
      toast.error('Erro ao cadastrar \n' + error.response.data.message);
    }
  }

  async function login() {
    try {
      const response = await user.post('/login', {
        email: email,
        password: password
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      toast.success('Usuário logado com  sucesso');
      navigate('/Stages');
      window.location.reload();
    } catch (error) {
      toast.error('Erro no login: ' + error.response.data.message);
    }
  }

  async function requestNewPassword() {
    const response = await user.post('/requestRecovery', {
      email: email
    });
    if (response.status == 200) {
      toast.success('Solicitação enviada com sucesso');
    } else {
      toast.error('Erro ao solicitar email');
    }
  }
  async function updateUnitys() {
    const response = await api.get('/unitys');
    setUnitys(response.data.Unitys);
  }
  const allOptions = unitys.map((unitys) => {
    return { label: <>{unitys.name}</>, value: unitys._id };
  });

  const OptionsRoles = [
    { label: 'DIRETOR', value: 1 },
    { label: 'JUIZ', value: 2 },
    { label: 'SERVIDOR', value: 3 },
    { label: 'ESTAGIARIO', value: 4 }
  ];
  const roles = ['', 'DIRETOR', 'JUIZ', 'SERVIDOR', 'ESTAGIARIO'];

  return (
    <Container>
      <Menu>
        <MenuElement
          onClick={() => {
            setSelectedTab('login');
          }}
          selected={selectedTab == 'login'}
        >
          Login
        </MenuElement>
        <MenuElement
          onClick={() => {
            setSelectedTab('register');
          }}
          selected={selectedTab == 'register'}
        >
          Cadastro
        </MenuElement>
      </Menu>
      {selectedTab == 'login' ? (
        <>
          <h1>Login</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              login();
            }}
          >
            <TextInput
              set={setEmail}
              value={email}
              placeholder="Email"
            ></TextInput>
            <br></br>
            <br></br>
            <TextInput
              set={setPassword}
              value={password}
              placeholder="Senha"
              type="password"
            ></TextInput>
            <ForgotPassword
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Esqueceu a senha?
            </ForgotPassword>
            <Button type="submit">Entrar</Button>
          </form>
        </>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <h1>Cadastre-se </h1>
          <TextInput
            set={setNewName}
            value={newName}
            placeholder="Nome completo"
          ></TextInput>
          <br></br>
          <TextInput
            set={setNewEmail}
            value={newEmail}
            placeholder="Email"
          ></TextInput>
          <br></br>
          <TextInput
            set={setNewPassword}
            value={newPassword}
            placeholder="Crie uma senha"
            type="password"
          ></TextInput>
          <br></br>
          <TextInput
            set={setNewPassword2}
            value={newPassword2}
            placeholder="Confirme a senha"
            type="password"
          ></TextInput>
          <EditDrop>
            <Dropdown
              options={OptionsRoles}
              onChange={(e) => {
                console.log('value', e.value);
                setNewRole(e.value);
              }}
              value={roles[newRole]}
              placeholder="Selecione o perfil"
              className="dropdown"
              controlClassName="dropdown-control"
              placeholderClassName="dropdown-placeholder"
              menuClassName="dropdown-menu"
              arrowClassName="dropdown-arrow"
            />
          </EditDrop>
          <EditDrop>
            <Dropdown
              options={allOptions}
              onChange={(e) => {
                setNewUnity(e.value);
              }}
              value={newUnity}
              placeholder="Selecione a unidade"
              className="dropdown"
              controlClassName="dropdown-control"
              placeholderClassName="dropdown-placeholder"
              menuClassName="dropdown-menu"
              arrowClassName="dropdown-arrow"
            />
          </EditDrop>
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
          <Button type="submit">Cadastrar</Button>
        </form>
      )}
      {isModalOpen && (
        <Modal>
          <Content>
            <h3>Recuperação de senha</h3>
            <h5>Você receberá um link via e-mail para criar sua nova senha</h5>
            <TextInput
              set={setEmail}
              value={email}
              placeholder="Digite seu email"
            ></TextInput>
            <Button
              onClick={() => {
                requestNewPassword();
                setModalOpen(false);
              }}
            >
              Solicitar recuperação
            </Button>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
              background="#de5353"
            >
              Cancelar
            </Button>
          </Content>
        </Modal>
      )}
    </Container>
  );
}

export default Login;
