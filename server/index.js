const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "bancoesi",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const email = req.body.email;
  const nome = req.body.nome;
  const telefone = req.body.telefone;
  const senha = req.body.senha;

  db.query("SELECT * FROM clientes WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    } else
    if (result.length == 0) {
      bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO clientes VALUES (\""+email+"\",\""+nome+"\",\""+telefone+"\",\""+hash+"\")",
          (error, response) => {
            if (err) {
              res.send(err);
            }else{
              
            res.send({ msg: nome + "Cadastro realizado com sucesso" });
            }
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT * FROM clientes WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(senha, result[0].senha, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});


app.listen(3001, () => {
  console.log("rodando na porta 3001");
});