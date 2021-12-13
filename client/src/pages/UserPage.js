import React, { CSSProperties } from 'react';
import { useState } from "react";
import Axios from 'axios';
import Select from 'react-select';
import DatePicker from "react-datepicker";
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
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';


const theme = createTheme();

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

    const [startDate, setStartDate] = useState(new Date());

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
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}

                        />

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={horarios[0]}
                            name="color"
                            options={horarios}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, background: 'orange' }}
                        >
                            Entrar
                        </Button>
                        <Grid container>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};


export default UserPage;
