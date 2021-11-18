const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  senha: "1234",
  database: "bancoesi",
});


app.use(express.json());
app.use(cors());

app.post("/cadastro", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  const nome = req.body.nome;
  const telefone = req.body.telefone;

  db.query("SELECT * FROM cadastro WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      // bcrypt.hash(senha, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO cadastro (email, nome, telefone, senha) VALUE (?,?,?,?)",
          [email, nome, telefone, senha],
          (error, response) => {
            if (err) {
              res.send({msg: "deu ruim"})
              res.send(err);
            }
            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      // });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  db.query("SELECT senha FROM Cadastro WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      result: yup
        if(yup.ref(senha)) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
