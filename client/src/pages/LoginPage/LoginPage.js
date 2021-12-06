import React from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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

const theme = createTheme();

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
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  Não tem um cadastro? Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
