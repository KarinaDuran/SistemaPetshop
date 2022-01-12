const bcrypt = require('bcrypt');
const db = require('../database/db');
const User = require('../models/user');
const Animal = require('../models/animal');
const saltRounds = 10;

module.exports = {
  async criaUser(req, res) {
    const email = req.body.email;
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const senha = req.body.senha;
    const confirmacao = req.body.confirmacao;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(confirmacao != senha){
      res.send({
        status: 401,
        statusText: 'As senhas não batem'
      })
      return;
    }
    if (!pattern.test(email)) {
      res.send({
        status: 402,
        statusText: "Email em formato errado."

      })
        return;
    }

  

    mesmoMail = await User.findOne({ where: { email: email } });
    if (mesmoMail) {
      res.send({
        status: 400,
        data: { message: email },
        statusText: 'email já cadastrado',
      });
    } else {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        user = User.create({
          email: email,
          nome: nome,
          telefone: telefone,
          senha: hash,
        });
        res.send({
          status: 200,
          data: { message: email },
          statusText: 'Cadastro realizado com sucesso',
        });
      });
    }
  },

  async login(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      res.send({
        status: 400,
        data: { message: email },
        statusText: 'email não encontrado',
      });
    else {
      bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
        if (error) res.send(error);
        if (response) {
          res.send({
            email: email,
            admin: email == 'administrador@gmail.com',
            data: { message: email },
            statusText: 'sucesso',
          });
        } else
          res.send({
            status: 401,
            data: { message: email },
            statusText: 'Senha Incorreta',
          });
      });
    }
  },
  async cadastraAnimal(req, res) {
    const nome_do_animal = req.body.nome_do_animal;
    const especie_do_animal = req.body.especie_do_animal;
    const porte_do_animal = req.body.porte_do_animal;
    const raca_do_animal = req.body.raca_do_animal;
    const email = req.body.email;

    animal = Animal.create({
      email: email,
      especie_do_animal: especie_do_animal,
      nome_do_animal: nome_do_animal,
      porte_do_animal: porte_do_animal,
      raca_do_animal: raca_do_animal,
    });
    res.send({
      data: { message: email },
      statusText: 'sucesso'
    })

  },
  async animaisDoUsuario(req, res) {
    lista = [];
    const email = req.query.email;
    const animalUsuario = await Animal.findAll({ where: { email: email } });
    for (const a of animalUsuario) {
      const nome_do_animal = a.dataValues.nome_do_animal;
      lista.push(
        nome_do_animal  
      );
    }
    res.send(lista);
  },

  async validateCredentials(req, res) {
    try {
      const email = req.query.email;
      const user = await User.findOne({ where: { email: email } });
      if (!user)
        res.send({
          data: { message: 'usuario não encontrado' },
          valid: false,
          admin: false,
        });
      res.send({
        data: { message: 'usuario encontrado' },
        valid: true,
        admin: email == 'administrador@gmail.com',
      });
    }
    catch (error) {
      res.send({
        data: { message: 'usuario não encontrado' },
        valid: false,
        admin: false,
      });
    }
  },
};
