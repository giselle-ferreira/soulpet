const Owner = require("../models/Owner")

class OwnerController {

    static async createOwner(req, res) {
        const owner = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            cpf: req.body.cpf,
        }

        await Owner.create(owner)
        res.status(202).json({ message: `owner-${owner.name}-created`})
    }

    static async showOwners(req, res) {
        const owner = await Owner.findAll({ raw: true})

        res.status(202).json(owner )
    }

    static async listOwnerToUpdate(req, res) {
        const owner = await Owner.findOne({ where: { id: req.params.id }})

        res.status(200).json(owner)
    }

    static async updateOwner(req, res) {
        const owner = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            cpf: req.body.cpf,
        }

        await Owner.update(owner, { where: { id: req.body.id }})
        res.status(200).json({ message: `owner-${owner.name}-successfully-updated` })

    }

    static async deleteOwner(req, res) {
        await Owner.destroy({ where: { id: req.body.id }})

        res.status(202).json({ message: `owner-${req.body.id}-deleted`})
    }
}

module.exports = OwnerController