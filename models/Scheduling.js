const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Pet = require('./Pet')

const Scheduling = db.define('Scheduling', {
    service: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date: {
        type: DataTypes.STRING,
        allowNull: false
    },

    time: {
        type: DataTypes.TIME,
        allowNull: false
    }
})

Pet.hasMany(Scheduling)
Scheduling.belongsTo(Pet)

module.exports = Scheduling
