import React, { useState } from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';
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
  MenuItem,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme(themeDefault);

const RegisterForm = () => {
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    Axios.post('http://localhost:3001/cadastro', values)
      .then(function (response) {
        //handle success
        alert(response.data.statusText);
        if (response.data.status === 200) {
          alert('Cadastro realizado com sucesso');
          window.location.href = '/login';
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
    confirmacao: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas são diferentes')
      .required('A confirmação da senha é obrigatória'),
    nome: yup.string().required('O nome é obrigatório'),
    telefone: yup.string().required('O telefone é obrigatório'),
    nome_animal: yup.string().required('O nome do animal é obrigatório'),
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
            Cadastro
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
            validationSchema={validationsRegister}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="telefone"
              label="Telefone"
              id="telefone"
              onChange={handleInputChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="nome_do_animal"
              label="Nome do animal"
              id="nome_do_animal"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="especie_do_animal"
              label="Espécie do animal"
              id="especie_do_animal"
              onChange={handleInputChange}
              select
            >
              <MenuItem value={'Cachorro'}>Cachorro</MenuItem>
              <MenuItem value={'Gato'}>Gato</MenuItem>
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              name="raca_do_animal"
              label="Raça do animal"
              id="raca_do_animal"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="porte_do_animal"
              label="Porte do animal"
              id="porte_do_animal"
              onChange={handleInputChange}
              select
            >
              <MenuItem value={'P'}>Pequeno</MenuItem>
              <MenuItem value={'M'}>Médio</MenuItem>
              <MenuItem value={'G'}>Grande</MenuItem>
            </TextField>

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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmacao"
              label="Confirme sua senha"
              type="password"
              id="confirmacao"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid item>
              <Link href="/login" variant="body2">
                Já tem cadastro? Faça seu login
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
