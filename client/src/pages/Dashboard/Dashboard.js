import { styled } from '@mui/material/styles';
import React, { Fragment, useState } from 'react';
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

const exampleData = [
  { nome: 'Caio', horario: '12h', animal: 'AuAu' },
  { nome: 'Vitor', horario: '13h', animal: 'Miau' },
];

const Schedule = ({ date, setDate }) => (
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
        {exampleData.map((row) => (
          <TableRow>
            <TableCell>{row.nome}</TableCell>
            <TableCell>{row.horario}</TableCell>
            <TableCell>{row.animal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Fragment>
);

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
