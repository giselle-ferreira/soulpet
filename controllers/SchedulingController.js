const Scheduling = require('../models/Scheduling')
const Pet = require('../models/Pet')

class SchedulingController {

    static async createScheduling(req, res) {
        const scheduling = {
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            PetId: req.body.PetId
        }

        await Scheduling.create(scheduling)
        res.status(202).json({ message: `scheduling-${scheduling.service}-created` })

    }

    static async showScheduling(req, res) {
        const scheduling = await Scheduling.findAll({include: Pet, where: { date: req.body.date } }, { raw: true })

        res.status(202).json({ scheduling})
    }

    static async listSchedulingToUpdate(req, res) {
        const scheduling = await Scheduling.findOne({where: { id: req.params.id  } })

        res.status(200).json({ scheduling})
    }

    static async updateScheduling(req, res) {

        const scheduling = {
            service: req.body.service,
            date: req.body.date,
            time: req.body.time,
            PetId: req.body.PetId
        }

        await Scheduling.update(scheduling, { where: { id: req.body.id }})
        res.status(200).json({ message: `scheduling-${scheduling.service}-successfully-updated`})
   
    }

    static async deleteScheduling(req, res) {

        await Scheduling.destroy({ where: { id: req.body.id }})
        res.status(202).json({ message: `scheduling-${req.body.id}-deleted` })
   
    }

}

module.exports = SchedulingController