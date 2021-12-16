const db = require('../database/db');
const Scheduling = require('../models/scheduling')
const animal = require('../models/animal')
const user = require('../models/user')


module.exports ={
    async reservaHorario(req, res){
        const email = req.body.email;
        const horario = req.body.horario;
        teste = await Scheduling.findAll({where: {horario: horario}})
        if(teste) return {status: 400, data: {message: 'Horário Ocupado'}, statusText: 'erro'}
        scheduling = Scheduling.create({
            email: email,
            horario: horario,
        })
        return {status: 201, data: {message: email}, statusText: 'erro'}
    }, 
    async mostrarHorario(req,res){
        lista = [];
        // const data = req.body.data;
        scheduling = await Scheduling.findAll(/*{where: {data: data}}*/
            include[{
                model
            }]);
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

        const data = req.body.data;
        scheduling = Scheduling.findAll({where: {data: data}});
        for(const s of scheduling){
            lista.pop(s.dataValues.horario)
        }
        return lista;

    }


}