import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import Quadro from "./Quadro/Quadro";
// import Select from 'react-select';
import themeDefault from '../theme';
import select from '@mui/material/Select';
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

  useEffect(() => {
    if (date) agendamento();
  }, [date]);
  useEffect(() => {
    if (date) agendaUsuario();
  }, [date]);

  const handleClick = async (event) => {
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const agendamento = async () => {
    Axios.get('http://localhost:3001/Agendamento', {
      params: {
        dia:
          `${date.getMonth() + 1}` +
          '/' +
          `${date.getDate()}` +
          '/' +
          `${date.getFullYear()}`,
      },
    }).then((response) => {
      setHora(response.data);
    });
  };

  const agendaUsuario = async () => {
    Axios.get('http://localhost:3001/AgendaUsuario', {
      params: {
        email: email,
      },
    }).then((response) => {
      setAgenda(response.data);
    });
  };


    const pets = async () => {
    Axios.get('http://localhost:3001/animaisUsuario', {
      params: {
        email: email,
      },
    }).then((response) => {
      setAnimais(response.data);
    });
  };

  // useEffect(() => {
  //  if(date) pets();
  // }, [animais]);
  const handleUser = async (e) => {
    Axios.post('http://localhost:3001/Agendamento', {
      email: email,
      dia:
        `${date.getMonth() + 1}` +
        '/' +
        `${date.getDate()}` +
        '/' +
        `${date.getFullYear()}`,
      horario: horario,
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

  const handleDelete = (horario, dataHorario) => {

    Axios.delete(`http://localhost:3001/deletarHorario/`, { data: { dia: dataHorario, horario: horario } }).then(res => {
      console.log(res);
      console.log(res.data);

    })
  };
  return authorizedAccess ? (
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
            Agendamento
          </Typography>
          <Box component="form" onSubmit={handleUser} sx={{ mt: 1 }}>
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
              sx={{ pb: 2 }}
            />
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
              onChange={(event) => setHorario(event.target.value)}
              select // tell TextField to render select
              label="Horario"
            >
              {hora.map((h) => (
                <MenuItem value={h}>{h}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              value={animal}
              onChange={(event) => setAnimal(event.target.value)}
              select // tell TextField to render select
              label="Pets"
            >
              {animais.map((a) => (
                <MenuItem value={a}>{a}</MenuItem>
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
