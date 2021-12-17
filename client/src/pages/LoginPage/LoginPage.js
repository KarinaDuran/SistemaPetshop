import React, { useState } from 'react';
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
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import themeDefault from '../../theme';


const theme = createTheme(themeDefault);

const LoginPage = () => {
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleLogin = async (e) => {
    Axios.post(
      "http://localhost:3001/login",
      values
    )
      .then(function (response) {
        //handle success
        alert(response.data.statusText);
        if (response.data.status == 401 || response.data.status == 400) {
      
        }else{
          if (response.data.admin) window.location.href = "/Dashboard";
          else window.location.href = "/Agendamento";
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
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
          <Avatar sx={{ m: 1, bgcolor: '#FFA466' }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
            sx={{ mt: 1 }}
          >

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              id="email"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                Não tem login? Faça seu cadastro
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;