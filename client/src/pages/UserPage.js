import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
// import Select from 'react-select';
import themeDefault from '../theme';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  MenuItem,
  OutlinedInput,
  Chip,
  InputLabel,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';

const theme = createTheme(themeDefault);

const UserPage = () => {
  const [horario, setHorario] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [hora, setHora] = useState([]);
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

  // useEffect(() => {
  //     if (horario) handleUser()
  // }, [horario])

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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Marcar Horário
            </Button>
            <Grid container>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  ) : (
    <>Carregando</>
  );
};

export default UserPage;
