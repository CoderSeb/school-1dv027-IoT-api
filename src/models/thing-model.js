import mongoose from 'mongoose'
import { Sensor, SensorSchema } from './sensor-model.js'


const ThingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: [100, 'Too long of a name...']
  },
  description: {
    type: String,
    required: true,
    maxLength: [500, 'Too long of a description...']
  },
  microcontroller: {
    type: String,
    required: true,
    maxLength: [100, 'Too long name of a microcontroller...']
  },
  sensors: {
    type: [SensorSchema]
  }
}, {
  versionKey: false
})

ThingsSchema.pre('deleteOne', function(next) {
  let id = this.getQuery()["_id"]
  Sensor.deleteMany({ thing_id: id }, next)
})

export const Thing = mongoose.model('Thing', ThingsSchema)
