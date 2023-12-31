const mongoose = require('mongoose')
const {DATABASE_URL} = process.env

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected from mongoose'))
    .on('error', (error) => console.log(error))

module.exports = {
    PokeCard: require('./PokeCard').PokeCard,
    Collection: require('./PokeCard').Collection
}