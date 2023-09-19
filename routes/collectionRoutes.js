const router = require('express').Router({mergeParams: true})
const {collectionCTRL} = require('../controllers')

router.get('/', collectionCTRL.getCollection)
router.post('/', collectionCTRL.createCollection)
router.put('/:collectionID', collectionCTRL.updateCollection)
router.delete('/:collectionID', collectionCTRL.deleteCollection)

module.exports = router