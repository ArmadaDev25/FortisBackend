const router = require('express').Router({mergeParams: true})
const {pokeCardCTRL} = require('../controllers')

router.get('/:pokeCardID', pokeCardCTRL.getPokeCard)
router.post('/', pokeCardCTRL.createPokeCard)
router.put('/:pokeCardID', pokeCardCTRL.updatePokeCard)
router.delete('/:pokeCardID', pokeCardCTRL.deletePokeCard)

module.exports = router