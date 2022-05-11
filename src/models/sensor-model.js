import mongoose from 'mongoose'


export const SensorSchema = new mongoose.Schema({
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
  influxField: {
    type: String,
    required: true
  }
})

export const Sensor = mongoose.model('Sensor', SensorSchema)
