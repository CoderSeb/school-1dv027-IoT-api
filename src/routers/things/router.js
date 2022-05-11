import express from 'express'
import ThingsController from '../../controllers/things-controller.js'


const router = express.Router()
const controller = new ThingsController()


router.get('/', controller.sayHello)

export default router