import { styled } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import {
  AppBar as MuiAppBar,
  Box,
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
useEffect(()=> {
  if(date)agendamento()
}, [date])

useEffect(()=> {
  window.test = AgendamentoData
}, [AgendamentoData])
const agendamento = async () => {
  Axios.get('http://localhost:3001/Dashboard', {
    params: {dia: `${date.getMonth()+1}` + "/" + `${date.getDate()}` +"/" + `${date.getFullYear()}`},  
}).then((response) => {
    setAgendamentoData(response.data);
  });
};
return(
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
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>Horário</TableCell>
          <TableCell>Animal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {AgendamentoData.map&&
        AgendamentoData.map((row) => (
          <TableRow>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.horario}</TableCell>
            <TableCell>{row.id_animal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Fragment>
);

}


const Dashboard = () => {


  const [date, setDate] = useState(new Date());

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
