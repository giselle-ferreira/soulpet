const express = require('express')
const router = express.Router()

const PetController = require('../controllers/PetController')

//create pet
router.post('/create', PetController.createPet)
//show pets
router.get('/:id', PetController.showPets)
//list pet to update
router.get('/update/:id', PetController.listPetToUpdate)
//edit pet
router.post('/update', PetController.updatePet)
//delete pet
router.post('/delete', PetController.deletePet)

module.exports = router
