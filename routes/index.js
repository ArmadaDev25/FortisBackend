const router = require('express').Router()
const collectionRoute = require('./collectionRoutes')
const pokeCardRoute = require('./pokeCardRoutes')

router.use('/collections', collectionRoute)
router.use('/collections/:collectionID/cards', pokeCardRoute)

module.exports = router