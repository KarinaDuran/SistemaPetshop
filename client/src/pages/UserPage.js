import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import themeDefault from '../theme';
import select from '@mui/material/Select';
import * as yup from 'yup';
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
  MenuItem,
  OutlinedInput,
  Chip,
  Paper,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';

const theme = createTheme(themeDefault);

const UserPage = () => {
  const [horario, setHorario] = useState('');
  const [animal, setAnimal] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [agenda, setAgenda] = useState([]);
  const [hora, setHora] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [date, setDate] = useState(new Date());
  const [authorizedAccess, setAuthorizedAccess] = useState(false);

  useEffect(async () => {
    await Axios.get('http://localhost:3001/validateCredentials', {
      params: {
        email: localStorage.getItem('email'),
      },
    })
      .then((response) => {
        if (response.data.valid && !response.data.admin)
          setAuthorizedAccess(true);
        else if (response.data.valid && response.data.admin)
          window.location.href = '/dashboard';
        else {
          localStorage.removeItem('email');
          window.location.href = '/login';
        }
      })
      .catch((response) => {
        //handle error
        console.log('error:' + response);
      });
  }, []);

  useEffect(async () => {
    if (date) agendamento();
  }, [date]);


  const agendamento = async () => {
    await Axios.get('http://localhost:3001/Agendamento', {
      params: {
        dia:
          `${date.getMonth() + 1}` +
          '/' +
          `${date.getDate()}` +
          '/' +
          `${date.getFullYear()}`,
          email:email
      },
    }).then((response) => {
      setAgenda(response.data[0].agenda);
      setAnimais(response.data[0].animais)
      setHora(response.data[0].horarios);
    });
  };



  const handleUser = async (e) => {
    await
      Axios.post('http://localhost:3001/Agendamento', {
        email: email,
        dia:
          `${date.getMonth() + 1}` +
          '/' +
          `${date.getDate()}` +
          '/' +
          `${date.getFullYear()}`,
        horario: horario,
        animal: animal
      })
        .then(function (response) {
          //handle success
          alert(response.data.statusText);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
  };

  const handleDelete = async(horario, dataHorario) => {

    await Axios.delete(`http://localhost:3001/Agendamento/`, { data: { dia: dataHorario, horario: horario } }).then(function (response) {
        //handle success
        alert(response.data.statusText);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
   
    

    // agendamento();

  };

  const validationAgendamento = yup.object().shape({
    pet: yup
      .string()
      .required('O pet é obrigatório'),
      horario: yup
      .string()
      .required('O horario é obrigatório'),

  });
  const logout = (e) => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };
  return authorizedAccess ? (
    <ThemeProvider theme={theme}>
      <Grid container sx={{
        marginTop: 2, width: 10, position: "absolute",
        top: 5,
        right: 100,
      }}>
        <Grid item>
          <Button variant="contained" fullWidth onClick={logout}>
            Sair
          </Button>
        </Grid>
      </Grid>

      <Container component="main" maxWidth="xs">

        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          
        >

          <Avatar sx={{ m: 1, bgcolor: '#FFA466' }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Agendamento
          </Typography>
          <Box component="form" onSubmit={handleUser} sx={{ mt: 1 }} validationSchema={validationAgendamento}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={localStorage.getItem('email')}
              disabled
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              sx={{ pb: 1 }}
            />
            <TextField
              fullWidth
              required
              value={animal}
              onChange={(event) => setAnimal(event.target.value)}
              select // tell TextField to render select
              label="Pets"
              id="pet"
              sx={{ pb: 2 }}
            >
              {animais.map((a) => (
                <MenuItem value={a}>{a}</MenuItem>
              ))}
            </TextField>


            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ptBRLocale}
            >
              <DatePicker
                label="Data"
                renderInput={(params) => (
                  <TextField fullWidth {...params} sx={{ pb: 2 }} />
                )}
                value={date}
                onChange={(newValue) => {
                  console.log(newValue);
                  setDate(newValue);
                }}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              value={horario}
              required
              onChange={(event) => setHorario(event.target.value)}
              select // tell TextField to render select
              label="Horario"
              id="horario"
            >
              {hora.map((h) => (
                <MenuItem value={h}>{h}</MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Marcar Horário
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/cadastroAnimal" variant="body2">
                  Cadastrar mais animais.
                </Link></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',

              }}
            >
              <Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  inline
                  pb={2}
                >
                  Agendamentos
                </Typography>
                <Typography
                  component="h9"
                  variant="h9"
                  color="black"
                  gutterBottom
                  inline
                  pb={2}
                >
                  Clique no agendamento para excluir
                </Typography>
                <TableContainer sx={{ pb: 2 }} >
                  <Table size="small" >
                    <TableHead>
                      <TableRow>
                        <TableCell>Dia</TableCell>
                        <TableCell>Horário</TableCell>
                        <TableCell>Nome do animal</TableCell>
                        <TableCell>Espécie</TableCell>
                        <TableCell>Porte</TableCell>
                        <TableCell>Raça</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {agenda.map &&
                        agenda.map((row) => (
                          <TableRow onClick={() => { if (window.confirm('Deseja excluir esse agendamento?')) { handleDelete(row.horario, row.dia) } }}>
                            <TableCell>{row.dia}</TableCell>
                            <TableCell>{row.horario}</TableCell>
                            <TableCell>{row.nome_do_animal}</TableCell>
                            <TableCell>{row.especie_do_animal}</TableCell>
                            <TableCell>{row.porte_do_animal}</TableCell>
                            <TableCell>{row.raca_do_animal}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  ) : (
    <>Carregando</>
  );
};

export default UserPage;
