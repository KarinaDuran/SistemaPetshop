const express = require('express');

const routes = express.Router();
const userController = require('./controller/userController');
const schedullingController = require('./controller/schedullingController');



routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
})

routes.post('/cadastro', userController.criaUser);
routes.post('/cadastroAnimal', userController.cadastraAnimal);
routes.post('/login', userController.login);
routes.get('/Dashboard', schedullingController.mostrarHorario);
routes.get('/Agendamento', schedullingController.dadosUsuario);
routes.post('/Agendamento', schedullingController.reservaHorario);
routes.get('/validateCredentials', userController.validateCredentials);
routes.delete('/Agendamento/', schedullingController.deletaHorario);
routes.delete('/Dashboard/', schedullingController.deletaHorario);




module.exports = routes;