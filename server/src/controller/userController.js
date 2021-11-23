const bcrypt = require("bcrypt");
const db = require('../database/db');
const User = require('../models/user')
const saltRounds = 10;

module.exports = {
  async criaUser(req, res){
    const email = req.body.email;
      const nome = req.body.nome;
      const telefone = req.body.telefone;
      const senha = req.body.senha;
    try{
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        user = await User.create({
          email: email,
          nome: nome,
          telefone: telefone,
          senha: hash
        })
        return {status: 201, data: {message: inscrito}, statusText: 'Cadastro realizado com sucesso'};
      })
    } 
    catch(erro){
      mesmoMail = await User.findOne({where: {email: email}})
      if (mesmoMail) return {status: 400, data: {message: cpf}, statusText: 'email já cadastrado'};
    }
  },
  
  async login(req, res){
    const email = req.body.email;
    const senha = req.body.senha;
    const user = await User.findOne({where: {email: email}})
    if(!user) return {status: 400, data: {message: cpf}, statusText: 'email não encontrado'}
    bcrypt.compare(senha, user.dataValues.senha, (error, response) => {
          if (error)  return error;
          if (response) return "Usuário logado" 
          else return  {status: 401, data: {message: cpf}, statusText: 'Senha Incorreta'}

    })  
  }
}

 
       

  