const Scheduling = require('../models/Scheduling')
const Pet = require('../models/Pet')
const Owner = require('../models/Owner')

class SchedulingController {

    static async createScheduling(req, res) {
        const scheduling = {
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            PetId: req.body.PetId
        };

        if (scheduling.service === "" || scheduling.date === "" || scheduling.time === "" || scheduling.PetId === "") {
            res.status(402).json({ message: 'scheduling-parameter-null' })
            return;
        };


        const pet = await Pet.findOne({ where: { id: scheduling.PetId } })

        if (!pet) {
            res.status(401).json({ message: `pet-${scheduling.PetId}-parameter-null` })
            return
        }

        const schedulingDate = await Scheduling.findAll({ include: Pet, where: { date: req.body.date } }, { raw: true })

        let isValidTime = true

        schedulingDate.forEach((t) => {
            if (scheduling.time === t.time) {
                isValidTime = false
            };
        });

        if (!isValidTime) {
            res.status(402).json({ message: `time-${scheduling.time}-not-available` })
            return;
        }

        await Scheduling.create(scheduling)
        res.status(202).json({ message: `scheduling-${scheduling.service}-created` })

    }

    static async showScheduling(req, res) {
        const scheduling = await Scheduling.findAll(
            {
                include: {
                    model: Pet,
                    include: Owner
                }, where: { date: req.body.date }
            }, { raw: true })

        if (!scheduling.length) {
            res.status(401).json({ message: `no-scheduling-on-${req.body.date}` })
            return
        } else {
            res.status(202).json({ scheduling })
        }

    }

    static async listSchedulingToUpdate(req, res) {

        const scheduling = await Scheduling.findOne({
            include: {
                model: Pet,
                include: Owner
            }
        }, { where: { id: req.params.id } })

        if (!scheduling) {
            res.status(406).json({ message: `scheduling-parameter-null` })
            return;
        }

        res.status(200).json({ scheduling })
    }

    static async updateScheduling(req, res) {

        const scheduling = {
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            PetId: req.body.PetId
        }

        if (scheduling.service === "" || scheduling.date === "" || scheduling.time === "" || scheduling.PetId === "") {
            res.status(402).json({ message: 'scheduling-parameter-null' })
            return;
        };

        const pet = await Pet.findOne({ where: { id: scheduling.PetId } })

        if (!pet) {
            res.status(401).json({ message: `pet-${scheduling.PetId}-parameter-null` })
            return
        }

        const schedulingDate = await Scheduling.findAll({ include: Pet, where: { date: req.body.date } }, { raw: true })

        let isValid = true

        schedulingDate.forEach((t) => {
            if (scheduling.time === t.time) {
                isValid = false
            };
        });

        if (!isValid) {
            res.status(402).json({ message: `time-${scheduling.time}-not-available` })
            return;
        }


        await Scheduling.update(scheduling, { where: { id: req.body.id } })
        res.status(200).json({ message: `scheduling-${scheduling.service}-successfully-updated` })

    }

    static async deleteScheduling(req, res) {

        const scheduling = await Scheduling.findOne({ where: { id: req.body.id } })
        if (!scheduling) {
            res.status(401).json({ message: `scheduling-parameter-null` })
            return;
        }


        await Scheduling.destroy({ where: { id: req.body.id } })
        res.status(202).json({ message: `scheduling-${req.body.id}-deleted` })

    }

}

module.exports = SchedulingController