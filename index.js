const express = require('express')
const conn = require('./db/conn')
const app = express()


// models
const Owner = require('./models/Owner')
const Pet = require('./models/Pet')
const Scheduling = require('./models/Scheduling')

//Routes
const ownerRoutes = require("./routes/ownerRoutes")
const petRoutes = require('./routes/petRoutes')

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/owners", ownerRoutes)
app.use('/pets', petRoutes)


// { force: true }
conn.sync().then(() => {
    app.listen(3000)

}).catch((err) => console.log(err))

