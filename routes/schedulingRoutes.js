const express = require('express')
const router = express.Router()

const SchedulingController = require('../controllers/SchedulingController')

// create Scheduling
router.post('/create', SchedulingController.createScheduling)
// show Scheduling
router.post('/', SchedulingController.showSchedulings)
// list Scheduling to update
router.get('/update/:id', SchedulingController.listSchedulingToUpdate)
// edit Scheduling
router.post('/update', SchedulingController.updateScheduling)
// delete Scheduling 
router.post('/delete', SchedulingController.deleteScheduling)

module.exports = router