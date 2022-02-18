const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Owner = require('./Owner')

const Pet = db.define('Pet', {
    name: { 
        type: DataTypes.STRING,
        allowNull: false 
    },

    breed: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    age: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    color: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    notes: {
        type: DataTypes.STRING, 
        allowNull: true 
    }
})

Owner.hasMany(Pet)
Pet.belongsTo(Owner)

module.exports = Pet

