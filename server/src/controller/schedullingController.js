const db = require('../database/db');
const Scheduling = require('../models/scheduling');
const Animal = require('../models/animal');
const User = require('../models/user');
const { now } = require('sequelize/dist/lib/utils');
const { Op } = require("sequelize");

module.exports = {
  async reservaHorario(req, res) {
    const email = req.body.email;
    const horario = req.body.horario;
    const dia = req.body.dia;
    const nomeAnimal = req.body.animal;
    animal = await Animal.findOne({
      where: { email: email, nome_do_animal: nomeAnimal },
    });
    const fk_id_animal = animal.id_animal;
    if ((await horario) == 'Selecione o horario')
      res.send({
        status: 400,
        data: { message: horario },
        statusText: 'Selecione seu horário',
      });
    else {
      scheduling = await Scheduling.create({
        email: email,
        horario: horario,
        dia: dia,
        fk_id_animal: fk_id_animal,
      });
      res.send({
        status: 201,
        data: { message: email },
        statusText: 'Horario Agendado',
      });
    }
  },
  async mostrarHorario(req, res) {
    lista = [];
    const data = req.query.dia;
    scheduling = await Scheduling.findAll({ where: { dia: data } });
    for (const s of scheduling) {
      animal = await Animal.findOne({
        where: { id_animal: s.dataValues.fk_id_animal },
      });
      user = await User.findOne({ where: { email: s.dataValues.email } });
      lista.push({
        nome: user.dataValues.nome,
        telefone: user.dataValues.telefone,
        email: s.dataValues.email,
        nome_do_animal: animal.dataValues.nome_do_animal,
        especie_do_animal: animal.dataValues.especie_do_animal,
        porte_do_animal: animal.dataValues.porte_do_animal,
        raca_do_animal: animal.dataValues.raca_do_animal,
        horario: s.dataValues.horario,
      });
    }
    res.send(lista);
  },
  async horarioLivre(req, res) {
 
    lista = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const data = req.query.dia;
    scheduling = await Scheduling.findAll({ where: { dia: data } });
    for (const s of scheduling) {
      var index = lista.indexOf(s.dataValues.horario);
      await lista.splice(index, 1);
    }
    res.send(lista);
  },

  async mostrarHorarioUser(req, res) {
    lista = [];
    const usuario = req.query.email;
    scheduling = await Scheduling.findAll({ where: { email: usuario } });
    for (const s of scheduling) {
      animal = await Animal.findOne({
        where: { id_animal: s.dataValues.fk_id_animal },
      });
      lista.push({
        dia: s.dataValues.dia,
        horario: s.dataValues.horario,
        nome_do_animal: animal.dataValues.nome_do_animal,
        especie_do_animal: animal.dataValues.especie_do_animal,
        porte_do_animal: animal.dataValues.porte_do_animal,
        raca_do_animal: animal.dataValues.raca_do_animal,

      });
    }
    res.send(lista);
  },
  async deletaHorario(req, res) {

    const hora = req.body.horario;
    const dia = req.body.dia;

    agendamento = await Scheduling.findOne({ where: { horario: hora, dia: dia } })
    if (!agendamento) {
      res.send({deletado: false,  statusText: 'Horario não deletado'})
      return;
    }
    else await Scheduling.destroy({ where: { horario: hora, dia: dia } });
    res.send({deletado: true,  statusText: 'Horario deletado'});
  },

  async dadosUsuario(req, res) {
    lista = [];
    const diaEhora = new Date();
    const hoje =  `${diaEhora.getMonth() + 1}` +
    '/' +
    `${diaEhora.getDate()}` +
    '/' +
    `${diaEhora.getFullYear()}`
    listaHorario = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const data = req.query.dia;
    scheduling1 = await Scheduling.findAll({ where: { dia: data } });
    for (const s of scheduling1) {
      var index = listaHorario.indexOf(s.dataValues.horario);
      await listaHorario.splice(index, 1);
    }

    listaAgenda = [];
    const usuario = req.query.email;
    scheduling2 = await Scheduling.findAll({
      where: {
        email: usuario, dia: {
          [Op.gte]: hoje
        }
      },
       order:[['dia'], ['horario'] ],
    }
   
    );
    for (const s of scheduling2) {
      animal = await Animal.findOne({
        where: { id_animal: s.dataValues.fk_id_animal },
      });
      listaAgenda.push({
        dia: s.dataValues.dia,
        horario: s.dataValues.horario,
        nome_do_animal: animal.dataValues.nome_do_animal,
        especie_do_animal: animal.dataValues.especie_do_animal,
        porte_do_animal: animal.dataValues.porte_do_animal,
        raca_do_animal: animal.dataValues.raca_do_animal,

      });
    }


    listaAnimal = [];
    const animalUsuario = await Animal.findAll({ where: { email: usuario } });
    for (const a of animalUsuario) {
      const nome_do_animal = a.dataValues.nome_do_animal;
      listaAnimal.push(
        nome_do_animal
      );
    }
    lista.push({
      agenda: listaAgenda,
      animais: listaAnimal,
      horarios: listaHorario
    });

    res.send(lista);
  }
};

