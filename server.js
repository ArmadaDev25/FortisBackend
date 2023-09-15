//require dotenv
require('dotenv').config()

//require express
const express = require('express')
const app = express()

//require cors
const cors = require('cors')

//post
const PORT = process.env.PORT || 4000

//import routes
const routes = require('./routes/index')


//MIDDLEWARE
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//ROUTES

app.use('/', routes)

app.use((req, res) => {res.status(404).json({message: "NOT A PROPER ROUTE"})})

//test route
// app.get('/', (req, res) => {
//     res.send('Homepage')
// })

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}...`)
})