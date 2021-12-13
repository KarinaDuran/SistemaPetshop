import React from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from "../theme"
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
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const theme = createTheme(themeDefault);

const RegisterForm = () => {
    const handleRegister = ({ values }) => {
        Axios.post('http://localhost:3001/cadastro', {
            nome : values.nome,
            email : values.email,
            telefone: values.telefone,
            senha: values.senha,
            confirmacao: values.confirmacao,
            nomeAnimal: values.nomeAnimal,
            Porte: values.Porte,
            Raca: values.Raca,
        }).then((response) => {
            alert(response.data.msg);
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
          nomeAnimal: yup.string().required('O nome do animal é obrigatório'),
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
                    <Avatar sx={{ m: 1, bgcolor: 'Orange' }}>
                        <PetsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} validationSchema={validationsRegister} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="email"
                            id="email"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="telefone"
                            label="telefone"
                            id="telefone"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="NomeAnimal"
                            label="Nome do animal"
                            id="NomeAnimal"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Raca"
                            label="Raça do animal"
                            id="Raca"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Porte"
                            label="Porte do animal"
                            id="Porte"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="senha"
                            label="Senha"
                            type="password"
                            id="senha"
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
                            sx={{ mt: 3, mb: 2}}
                            
                        >
                            Cadastrar
                        </Button>
                        <Grid item>
                <Link href="/" variant="body2">
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
