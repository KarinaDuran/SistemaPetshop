import React from 'react';
import Typography from '../../components/Typography';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginPage = () => {
  const handleLogin = ({ email, senha }) => {
    Axios.post('http://localhost:3001/login', {
      email,
      senha,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
  });

  return (
    <Section>
      <Typography component="h1">Entrar</Typography>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <Input title="Email" name="email" />
          <Input title="Senha" name="senha" password />
          <Link href="/">Esqueci minha senha</Link>
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
    </Section>
  );
};

export default LoginPage;
