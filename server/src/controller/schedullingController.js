const db = require('../database/db');
const Scheduling = require('../models/scheduling')
const animal = require('../models/animal')
const user = require('../models/user')


module.exports ={
    async reservaHorario(req, res){
        console.log(req.body);
        const email = req.body.email;
        const horario = req.body.horario;
        const dia = req.body.dia;
        const fk_id_animal = 1;
        if(await horario == "Selecione o horario") res.send({status: 400, data: {message: horario}, statusText: 'Selecione seu horário'})
        else{
        scheduling = await Scheduling.create({
            email: email,
            horario: horario,
            dia: dia,
            fk_id_animal: fk_id_animal,
        })
        res.send({status: 201, data: {message: email}, statusText: 'Horario Agendado'})
        }
}, 
    async mostrarHorario(req,res){
        lista = [];
        const data = req.query.dia;
        scheduling = await Scheduling.findAll({where: {dia: data}}
        );
        for(const s of scheduling){
            lista.push({
                email: s.dataValues.email,
                id_animal: s.fk_id_animal,
                horario: s.dataValues.horario
            })
        }
        res.send(lista);
    }, 
    async horarioLivre(req, res){
        lista = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

        const data = req.query.dia;
        scheduling = await Scheduling.findAll({where: {dia: data}});
        for(const s of scheduling){
            var index = lista.indexOf(s.dataValues.horario);
            lista.splice(index, 1);
        }
        res.send(lista);

    }


}