import * as yup from 'yup';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import Input from './components/Input';
import Button from './components/Button';
import Axios from 'axios';

function App() {
  const handleLogin = ({ email, senha }) => {
    Axios.post('http://localhost:3001/login', {
      email,
      senha,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const handleRegister = (values) => {
    Axios.post('http://localhost:3001/register', {
      email: values.email,
      nome: values.nome,
      telefone: values.telefone,
      senha: values.senha,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
    confirmation: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas são diferentes')
      .required('A confirmação da senha é obrigatória'),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <Input title="Email" name="email" />
          <Input title="Senha" name="senha" password />
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
      {/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <Input title="Email" name="email" />
          <Input title="Senha" name="senha" password />
          <Input title="Confirmar senha" name="confirmation" password />
          <Input title="Nome" name="nome" />
          <Input title="Telefone" name="telefone" />
          <div className="register-form-group">
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
          <div className="form-group">
            <Field name="nome" className="form-field" placeholder="Nome" />

            <ErrorMessage component="span" name="nome" className="form-error" />
          </div>

          <div className="form-group">
            <Field
              name="telefone"
              className="form-field"
              placeholder="Telefone"
            />

            <ErrorMessage
              component="span"
              name="telefone"
              className="form-error"
            />
          </div>

          <Button className="button" type="submit" inverse variant="darker">
            Cadastrar
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default App;
