// import { useState } from "react";
// import "./App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function App() {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      senha: values.senha,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const Cadastro = (values) => {
    Axios.post("http://localhost:3001/cadastro", {
      email: values.email,
      senha: values.senha,
      nome: values.nome,
      telefone: values.telefone
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const verificacaoLogin = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    senha: yup
      .string()
      .required("A senha é obrigatória"),
  });

  const VerificacaoCadastro = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("Este campo é obrigatório"),
    senha: yup
      .string()
      .required("Este campo é obrigatório"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas são diferentes")
      .required("Este campo é obrigatório"),
    nome: yup
      .string()
      .required("Este campo é obrigatório"),
    telefone: yup
      .string()
      .required("Este campo é obrigatório")
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={verificacaoLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="form-group">
            <Field name="senha" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="senha"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={Cadastro}
        validationSchema={VerificacaoCadastro}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="nome" className="form-field" placeholder="Nome" />

            <ErrorMessage
              component="span"
              name="nome"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="telefone" className="form-field" placeholder="Telefone" />

            <ErrorMessage
              component="span"
              name="telefone"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="senha" 
            className="form-field" 
            placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="senha"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field
              name="confirmation"
              className="form-field"
              placeholder="Senha"
            />

            <ErrorMessage
              component="span"
              name="confirmation"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
