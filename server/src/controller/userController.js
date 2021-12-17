const bcrypt = require("bcrypt");
const db = require('../database/db');
const User = require('../models/user')
const Animal = require('../models/animal')
const saltRounds = 10;

module.exports = {
  async criaUser(req, res){
    console.log(req.body.email);
      const email = req.body.email;
      const nome = req.body.nome;
      const telefone = req.body.telefone;
      const nome_do_animal = req.body.nome_do_animal;
      const especie_do_animal = req.body.especie_do_animal;
      const porte_do_animal =  req.body.porte_do_animal;
      const raca_do_animal = req.body.raca_do_animal; 
      const senha = req.body.senha;
    try{
    mesmoMail = await User.findOne({where: {email: email}})
    if (mesmoMail) throw 400; 
    bcrypt.hash(senha, saltRounds, (err, hash) => {
        user = User.create({
          email: email,
          nome: nome,
          telefone: telefone,
          senha: hash
        })
        animal = Animal.create({
          email: email,
          especie_do_animal: especie_do_animal,
          nome_do_animal: nome_do_animal, 
          porte_do_animal: porte_do_animal,
          raca_do_animal: raca_do_animal
        })
  
        res.send({status: 201, data: {message: email}, statusText: 'Cadastro realizado com sucesso'});
      })
    } 
    catch(erro){
      res.send({status: 400, data: {message: email}, statusText: 'email já cadastrado'});
      // mesmoMail = await User.findOne({where: {email: email}})
      // if (mesmoMail) res.send({status: 400, data: {message: email}, statusText: 'email já cadastrado'});
    }
  },
  
  async login(req, res){
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await User.findOne({where: {email: email}})
    if(!user) res.send({status: 400, data: {message: email}, statusText: 'email não encontrado'})
    bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
          if (error)  res.send(error);
          if (response){
            res.send({email: email, admin: email == 'administrador@gmail.com', data:{message: email}, statusText: 'sucesso'} );
     } else res.send({status: 401, data: {message: email}, statusText: 'Senha Incorreta'})

    })  
  }
}

 
       

  