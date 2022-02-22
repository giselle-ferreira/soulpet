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

        if(pet.name === "" || pet.breed === "" || pet.age === "" || pet.color === "" || pet.notes === "" || pet.OwnerId === "" ) {
            res.status(402).json({ message : 'pet-parameter-null' })
        }

        await Pet.create(pet)
        res.status(202).json({ message: `pet-${pet.name}-created`})
    }


    static async showPets(req, res){
        const owner = await Owner.findOne({include: Pet, where: { id: req.params.id }})
    
        if (!owner) {
            res.status(406).json({ message: 'owner-parameter-null' })
            return
        }

        res.status(201).json({ owner })
    
    }


    static async listPetToUpdate(req, res){
        const pet = await Pet.findOne({ where: { id: req.params.id }})

        if (!pet) {
            res.status(402).json({ message: 'pet-parameter-null' })
            return
        }

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

        if(pet.name === "" || pet.breed === "" || pet.age === "" || pet.color === "" || pet.notes === "" || pet.OwnerId === "" ) {
            res.status(402).json({ message : 'pet-parameter-null' })
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