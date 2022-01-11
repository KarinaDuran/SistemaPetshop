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

const AnimalRegister = () => {
  const [values, setValues] = useState({});
  const [email] = useState(localStorage.getItem('email'));
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRegisterPet = async (e) => {
    Axios.post('http://localhost:3001/CadastroAnimal',{
    email: email,
    nome_do_animal: values.nome_do_animal,
    especie_do_animal: values.especie_do_animal,
    porte_do_animal: values.porte_do_animal,
    raca_do_animal: values.raca_do_animal
  } )
      .then(function (response) {
        //handle success
        alert(response.data.statusText);
        if (response.data.status === 200) {
          alert('Cadastro do animal realizado com sucesso');
          window.location.href = '/Agendamento';
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };



  const validationsRegisterPet = yup.object().shape({
    nome_do_animal: yup
      .string()
      .required('O Nome é obrigatório'),
    especie_do_animal: yup.string().required('A especie é obrigatória'),
    raca_do_animal: yup.string().required('A raça é obrigatória'),
    porte_do_animal: yup.string().required('O porte é obrigatório'),
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
            Cadastro de animais
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegisterPet}
            validationSchema={validationsRegisterPet}
            sx={{ mt: 1 }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar pet
            </Button>
            <Grid item>
              <Link href="/Agendamento" variant="body2">
                Voltar ao agendamento
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AnimalRegister;
