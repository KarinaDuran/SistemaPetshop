const db = require('../database/db');
const {DataTypes} = require('sequelize');

const Scheduling = db.sequelize.define('agendamento', {
    email: {
        type: db.Sequelize.STRING,
        primaryKey: true
    },
    dia: {
        type: db.Sequelize.DATEONLY
    },
    horario: {
        type: db.Sequelize.STRING,
    },
    fk_id_animal:{
        type: db.Sequelize.INTEGER,
        references: {
            model: 'Animais',
            key: 'id_animal'
          }
    }
}
, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Scheduling;