const Owner = require("../models/Owner")
const Pet = require("../models/Pet")
const Scheduling = require('../models/Scheduling')

class OwnerController {

    static async createOwner(req, res) {
        const owner = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            cpf: req.body.cpf,
        }

        if (owner.name === "" || owner.phone === "" || owner.email === "" || owner.address === "" || owner.cpf === "") {
            res.status(402).json({ message: 'owner-parameter-null' })
            return;
        };

        await Owner.create(owner)
        res.status(202).json({ message: `owner-${owner.name}-created` })
    }

    static async showOwners(req, res) {
        const owner = await Owner.findAll(
            {
                include: {
                    model: Pet,
                    include: {
                        model: Scheduling
                    }
                }}, { raw: true })

        if (owner.length > 0) {
            res.status(202).json(owner)
        } else {
            res.status(402).json({ message: 'list-owner-parameter-null' })
            return;
        };

    }

    static async listOwnerToUpdate(req, res) {
        const owner = await Owner.findOne({
            include: {
                model: Pet,
                include: {
                    model: Scheduling
                }
            }}, { where: { id: req.params.id } })

        if (!owner) {
            res.status(406).json({ message: 'owner-parameter-null' })
            return;
        };

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

        if (owner.name === "" || owner.phone === "" || owner.email === "" || owner.address === "" || owner.cpf === "") {
            res.status(402).json({ message: 'owner-parameter-null' })
            return;
        };

        await Owner.update(owner, { where: { id: req.body.id } })

        res.status(200).json({ message: `owner-${owner.name}-successfully-updated` })

    }

    static async deleteOwner(req, res) {

        const owner = await Owner.findOne({ where: { id: req.body.id } }, { raw: true })
        if (!owner) {
            res.status(406).json({ message: 'owner-parameter-null' })
            return;
        };

        const pets = await Pet.findAll({ where: { OwnerId: owner.id } }, { raw: true })

        const scheduling = await Scheduling.findAll()

        pets.forEach((pet) => {
            scheduling.forEach(() => {
                Scheduling.destroy({ where: { PetId: pet.id } })
            })
        })

        pets.forEach(() => {
            Pet.destroy({ where: { OwnerId: owner.id } })
        })

        await Owner.destroy({ where: { id: req.body.id } })

        res.status(202).json({ message: `owner-${req.body.id}-and-pets-deleted` })

    }
}

module.exports = OwnerController

