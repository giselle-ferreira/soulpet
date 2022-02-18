const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Owner = db.define('Owner', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,        
    },

    cpf: {
        type: DataTypes.STRING,
        allowNull: false,        
    }

})

module.exports = Owner
