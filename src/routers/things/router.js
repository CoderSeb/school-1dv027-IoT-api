import express from 'express'
import ThingsController from '../../controllers/things-controller.js'


const router = express.Router()
const controller = new ThingsController()

router.route('/')
  .get(controller.getAll)
  .post(controller.addThing)

router.route('/:thingName')
  .get(controller.getThing)
  .delete(controller.deleteThing)

router.route('/:thingName/sensors')
  .get(controller.getSensors)

router.route('/:thingName/sensors/:sensorName')
  .get(controller.getSensor)

export default router