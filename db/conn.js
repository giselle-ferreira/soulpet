const { Sequelize } = require('sequelize')
require('dotenv').config(); 
const sequelize = new Sequelize('soulpet', 'root', process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
})


try {
    sequelize.authenticate()
    console.log('Conectado ao banco de dados')

} catch(err) {
    console.log('Não conectado.')
}


module.exports = sequelize