const express = require('express')

const EventCtrl = require('../controllers/event-ctrl')

const router = express.Router()

router.post('/events', EventCtrl.createTable)
router.put('/:page/:id', EventCtrl.updateEvent)
router.delete('/event/:id', EventCtrl.deleteEvent)
router.get('/event/:id', EventCtrl.getEventById)
router.post('/:page/upload', EventCtrl.updateEventByFile)
router.get('/:page/view', EventCtrl.getEvents)
router.get('/:page/download/csv', EventCtrl.getCSV)
router.get('/:page/download/xls', EventCtrl.getXLS)
router.get('/events', EventCtrl.getTables)

module.exports = router
