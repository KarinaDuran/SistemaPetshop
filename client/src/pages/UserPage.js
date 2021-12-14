import React, { CSSProperties } from 'react';
import { useState } from "react";
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

const theme = createTheme(themeDefault);

const horarios = [
    { value: '00:00', label: '00:00' },
    { value: '01:01', label: '01:01' },
    { value: '02:02', label: '02:02' }
]

const UserPage = () => {
    const handleAgendamento = (values) => {
        Axios.post("http://localhost:3001/Agendamento", {
            data: values.data,
            hora: values.hora,
        }).then((response) => {
            alert(response.data.msg);
        });
    };

    const [horario, setHorario] = useState("02:02");

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
                    <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                        <PetsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Agendamento
                    </Typography>
                    <Box component="form" onSubmit={handleAgendamento} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                        />


                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Data"
                                renderInput={(params) => <TextField {...params} sx={{ mt: 3, mb: 2 }} fullWidth />}

                            />

                        </LocalizationProvider>
                        {/* <InputLabel id="demo-multiple-chip-label">Horario</InputLabel> */}
                        <Select
                            fullWidth
                            label="Horario"
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            value={horario}
                            onChange={(event) => { setHorario(event.target.value) }}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {horario.toString()}
                                </Box>
                            )}
                        >
                            {horarios.map((hora) => (
                                <MenuItem
                                    key={hora.label}
                                    value={hora.value}
                                // style={getStyles(name, personName, theme)}
                                >
                                    {hora.label}
                                </MenuItem>
                            ))}
                        </Select>

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

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};


export default UserPage;
