import { Sensor } from '../models/sensor-model.js'
import { Thing } from '../models/thing-model.js'

export default class ThingsController {
  async sayHello(req, res, next) {
    res.send('Hello World! from things controller')
  }

  async addThing(req, res, next) {
    try {
      const { name, description, microcontroller, sensors } = req.body
      const newThing = new Thing({
        name,
        description,
        microcontroller
      })
      await newThing.save()
      for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i]
        const newSensor = new Sensor(sensor)
        await newSensor.save()
        newThing.sensors.push(newSensor)
        await newThing.save()
      }
      res.send(newThing)
    } catch (err) {
      next(err)
    }
  }
}
