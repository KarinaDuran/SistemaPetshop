/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableContainer,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';
const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Schedule = ({ date, setDate }) => {
  const [AgendamentoData, setAgendamentoData] = useState([]);
  const [authorizedAccess, setAuthorizedAccess] = useState(false);

  useEffect(async () => {
    await Axios.get('http://localhost:3001/validateCredentials', {
      params: { email: localStorage.getItem('email') },
    })
      .then((response) => {
        console.log(response);
        if (response.data.valid && response.data.admin)
          setAuthorizedAccess(true);
        else if (response.data.valid && !response.data.admin)
          window.location.href = '/Agendamento';
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
    Axios.get('http://localhost:3001/Dashboard', {
      params: {
        dia:
          `${date.getMonth() + 1}` +
          '/' +
          `${date.getDate()}` +
          '/' +
          `${date.getFullYear()}`,
      },
    }).then((response) => {
      setAgendamentoData(response.data);
    });
  };

  const handleDelete = (horario) => {
    const dia = `${date.getMonth() + 1}` +
      '/' +
      `${date.getDate()}` +
      '/' +
      `${date.getFullYear()}`;
    Axios.delete(`http://localhost:3001/Dashboard/`, { data: { dia: dia, horario: horario } }).then(res => {
      console.log(res);
      console.log(res.data);

    })
  };

  return authorizedAccess ? (

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
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
        <DatePicker
          label="Data"
          renderInput={(params) => <TextField {...params} sx={{ pb: 2 }} />}
          value={date}
          onChange={(newValue) => {
            console.log(newValue);
            setDate(newValue);
          }}
        />
      </LocalizationProvider>
      <TableContainer sx={{ pb: 2 }} >
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell>Horário</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nome do animal</TableCell>
              <TableCell>Espécie</TableCell>
              <TableCell>Porte</TableCell>
              <TableCell>Raça</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {AgendamentoData.map &&
              AgendamentoData.map((row) => (
                <TableRow onClick={() => { if (window.confirm('Deseja excluir esse agendamento?')) { handleDelete(row.horario) } }}>
                  <TableCell
                    name="horario"
                    label="horario"
                    id="horario">{row.horario}</TableCell>
                  <TableCell>{row.nome}</TableCell>
                  <TableCell>{row.telefone}</TableCell>
                  <TableCell>{row.email}</TableCell>
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
  ) : (
    <>Carregando...</>
  );
};

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };
  return (

    <Box sx={{ display: 'flex' }}>

      <AppBar position="absolute">
        <Toolbar sx={{ pr: '24px' }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <Button variant="outlined" color="secondary" onClick={logout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
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
                <Schedule date={date} setDate={setDate} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;