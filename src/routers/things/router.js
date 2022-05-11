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



export default router