const express = require('express')
const conn = require('./db/conn')
const app = express()


// models
const Owner = require('./models/Owner')
const Pet = require('./models/Pet')
const Scheduling = require('./models/Scheduling')





// { force: true }
conn.sync().then(() => {
    app.listen(3000)

}).catch((err) => console.log(err))

