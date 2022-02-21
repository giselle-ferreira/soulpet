const express = require('express')
const router = express.Router()

const OwnerController = require('../controllers/OwnerController')

// create owner
router.post('/create', OwnerController.createOwner)
// show owners
router.get('/', OwnerController.showOwners)
// list owner to update
router.get('/update/:id', OwnerController.listOwnerToUpdate)
// edit owner
router.post('/update', OwnerController.updateOwner)
// delete owner 
router.post('/delete', OwnerController.deleteOwner)

module.exports = router