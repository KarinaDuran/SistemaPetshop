const db = require('../database/db');
const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize')

const User = db.sequelize.define('usuarios', {
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});
module.exports = User;