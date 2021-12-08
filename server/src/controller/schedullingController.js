const db = require('../database/db');
const Scheduling = require('../models/scheduling')

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
        scheduling = Scheduling.findAll();
        for(const s of scheduling){
            lista.push({
                email: s.dataValues.email,
                horario: s.dataValues.horario
            })
        }
        return lista;
    }

}