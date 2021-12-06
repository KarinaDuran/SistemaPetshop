const db = require('../database/db');
const {DataTypes} = require('sequelize');

const Scheduling = db.sequelize.define('agendamento', {
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true
    },
    horario: {
        type: db.Sequelize.DATE
    },
}
, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = User;