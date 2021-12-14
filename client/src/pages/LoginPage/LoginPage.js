import React from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import { Form, Formik } from 'formik';

const formStatusProps = {
  success: {
    message: 'Login realizado com sucesso.',
    type: 'success',
  },
  error: {
    message: 'Algo deu errado. Tente novamente',
    type: 'error',
  },
};

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
      .email('Este endereço de email é inválido')
      .required('O email é obrigatório'),
    senha: yup.string().matches(/.{8}/g).required('A senha é obrigatória'),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
               <Avatar sx={{ m: 1, bgcolor: '#FFA466' }}>
                        <PetsIcon />
                    </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <Formik
            initialValues={{ email: '', senha: '' }}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            {({
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => (
              <Form>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  value={values.email}
                  name="email"
                  type="email"
                  helperText={
                    errors.email && touched.email
                      ? errors.email
                      : 'Insira seu email'
                  }
                  error={Boolean(errors.email && touched.email)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="senha"
                  label="Senha"
                  type="password"
                  id="senha"
                  value={values.senha}
                  helperText={errors.senha && touched.senha && 'Senha inválida'}
                  error={Boolean(errors.password && touched.password)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                Não tem um cadastro? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
