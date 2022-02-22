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

        if(owner.name === "" || owner.phone === "" || owner.email === "" || owner.address === "" || owner.cpf === "" ) {
            res.status(402).json({ message : 'owner-parameter-null' })
        }

        await Owner.create(owner)
        res.status(202).json({ message: `owner-${owner.name}-created`})

       
    }


    static async showOwners(req, res) {
        const owner = await Owner.findAll({ raw: true})

        if (owner.length > 0) {
            res.status(200).json(owner)
        } else {
            res.status(402).json({ message: 'list-owner-parameter-null' })
            return;
        };
    }


    static async listOwnerToUpdate(req, res) {
        const owner = await Owner.findOne({ where: { id: req.params.id }})

        if (!owner) {
            res.status(406).json({ message: 'owner-parameter-null' })
            return
        }

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

        if(owner.name === "" || owner.phone === "" || owner.email === "" || owner.address === "" || owner.cpf === "" ) {
            res.status(402).json({ message : 'owner-parameter-null' })
        }


        await Owner.update(owner, { where: { id: req.body.id }})
        res.status(200).json({ message: `owner-${owner.name}-successfully-updated` })

    }

    
    static async deleteOwner(req, res) {
        const owner = await Owner.findOne({ where: { id: req.body.id }})

        if (!owner) {
            res.status(406).json({ message: 'owner-parameter-null' })
            return
        }

        res.status(202).json({ message: `owner-${req.body.id}-deleted`})
    }
}

module.exports = OwnerController