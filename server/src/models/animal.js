const db = require('../database/db');
const {DataTypes} = require('sequelize');
const User = require('../models/user')

const Animal = db.sequelize.define('animais', {
    id_animal: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING,
    },
    especie_do_animal: {
        type: db.Sequelize.STRING
    },
    nome_do_animal: {
        type: db.Sequelize.STRING
    },
    porte_do_animal:{
        type: db.Sequelize.STRING
    },
    raca_do_animal:{
        type: db.Sequelize.STRING
    }

}
, {
    timestamps: false,
    freezeTableName: true,
});



module.exports = Animal;