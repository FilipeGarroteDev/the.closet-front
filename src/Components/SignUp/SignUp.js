/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Form from '../../Common/Form';
import BottomMenu from '../../Common/BottomMenu';
import HeaderMenu from '../../Common/TopBar/TopMenu';

export default function SignUp() {
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();

  function handleForm(e) {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  }

  async function sendForm(e) {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupData;

    if (!name || !email || !password) {
      alert(
        'Todos os campos são de preenchimento obrigatório!\nPor gentileza, revise seus dados!'
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        'As senhas inseridas devem ser iguais!\nPor gentileza, revise seus dados!'
      );
      return;
    }

    try {
      await axios.post(
        'https://back-projeto14-the-closet.herokuapp.com/signup',
        {
          name,
          email,
          password,
        }
      );
      alert('Usuário criado com sucesso! :)');
      navigate('/login');
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <>
      <HeaderMenu />
      <Wrapper>
        <LoginContainer>
          <legend>
            <ion-icon name="person-circle-outline" />
          </legend>
          <h1>Crie sua conta</h1>
          <Form onSubmit={sendForm}>
            <section>
              <label htmlFor="user">Nome de usuário:</label>
              <input
                type="text"
                name="name"
                id="user"
                placeholder="Digite seu username"
                onChange={handleForm}
              />
            </section>
            <section>
              <label htmlFor="email"> E-mail:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu e-mail"
                onChange={handleForm}
              />
            </section>
            <section>
              <label htmlFor="password"> Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Digite sua senha"
                onChange={handleForm}
              />
            </section>
            <section>
              <label htmlFor="confirmPassword"> Confirme sua senha:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirme a senha"
                onChange={handleForm}
              />
            </section>
            <button>Cadastrar</button>
          </Form>
        </LoginContainer>
        <span onClick={() => navigate('/login')}>
          Já possui um usuário? Faça já seu login!
        </span>
      </Wrapper>
      <BottomMenu />
    </>
  );
}

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
    color: #d4a373;
  }

  legend {
    font-size: 38px;
    color: #5b3e40;
    background-color: #ffffff;
    overflow: hidden;
    border-radius: 50px;
    margin-left: calc(50% - 18px);
  }

  span {
    margin-top: 30px;
    font-size: 12px;
    font-weight: 700;
    text-decoration: underline;
    color: #d4a373;

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`;

const LoginContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: auto;
  border-radius: 20px;
  border: 1px solid #c3c3c3;
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
`;
