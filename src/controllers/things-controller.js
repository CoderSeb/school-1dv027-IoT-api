import createError from 'http-errors'
import { Sensor } from '../models/sensor-model.js'
import { Thing } from '../models/thing-model.js'

export default class ThingsController {
  async getThing(req, res, next) {
    const { thingName } = req.params
    const foundThing = await Thing.findOne({ name: thingName })
    if (!foundThing) {
      return next(createError(404, 'Thing not found'))
    }
    res.send(foundThing)
  }
  
  
  async getAll(req, res, next) {
    const foundThings = await Thing.find()
    res.send(foundThings)
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
        sensor.thing_id = newThing._id
        const newSensor = new Sensor(sensor)
        await newSensor.save()
        newThing.sensors.push(newSensor)
        await newThing.save()
      }
      await newThing.save()
      res.status(201).send(newThing)
    } catch (err) {
      if (err.code=== 11000) {
        return next(createError(409, 'Thing already exists'))
      }
      next(err)
    }
  }

  async deleteThing(req, res, next) {
    const { thingName } = req.params
    const foundThing = await Thing.findOne({ name: thingName })
    if (!foundThing) {
      return next(createError(404, 'Thing not found'))
    }
    await Thing.deleteOne({ name: thingName, _id: foundThing._id })
    res.sendStatus(204)
  }
}
