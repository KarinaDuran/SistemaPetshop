const express = require('express');

const routes = express.Router();
const userController = require('./controller/userController');
const schedullingController =require('./controller/schedullingController');



routes.get('/', (req, res) => {
    return res.json({
        message: 'Hello World'
    });
})

routes.post('/cadastro', userController.criaUser);
routes.post('/login', userController.login);
routes.get('/Dashboard', schedullingController.mostrarHorario);
routes.get('/agendamento', schedullingController.horarioLivre);
// routes.all('/*', async (req, res) => {
//     console.log(req.url)
//     regex = new RegExp("[/]|[?]")
//     splittedUrl = req.url.split(regex);
//     func = controllers[splittedUrl[1]][splittedUrl[2]];
//     if(func){
//         resp = await func(req, res)
//         if (resp.status) res.status(resp.status)
//         res.json({message: resp})
//     }else{
//         return res.json({
//             message: 'Hello World :)' 
//         });
//     }
// });


module.exports = routes;