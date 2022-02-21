const Pet = require('../models/Pet')
const Owner = require('../models/Owner')

class PetController {

    static async createPet(req, res){
        const pet = {
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            color: req.body.color,
            notes: req.body.notes,
            OwnerId: req.body.OwnerId
        }
        await Pet.create(pet)
        res.status(202).json({ message: `pet-${pet.name}-created`})
    }

    static async showPets(req, res){
        const owner = await Owner.findOne({include: Pet, where: { id: req.params.id }})
    
        res.status(201).json({ owner })
        // ({ owner: owner.get({ plain: true })})
    
    }


    static async listPetToUpdate(req, res){
        const pet = await Pet.findOne({ where: { id: req.params.id }})

        res.status(200).json(pet)
    }

    static async updatePet(req, res) {
    
        const pet = {
            name: req.body.name,        
            breed: req.body.breed,
            age: req.body.age,
            color: req.body.color,
            notes: req.body.notes,
            OwnerId: req.body.OwnerId
        }
        await Pet.update(pet, { where: { id: req.body.id }})
        res.status(200).json({ message: `pet-${pet.name}-successfully-updated` })
    }

    static async deletePet(req, res) {

        await Pet.destroy({ where: { id: req.body.id }})
        res.status(202).json({ message: `pet-${req.body.id}-deleted` })
    }
}

module.exports = PetController