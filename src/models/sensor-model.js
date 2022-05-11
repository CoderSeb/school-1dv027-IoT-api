import mongoose from 'mongoose'

const SensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    },
    thing_id: {
      type: String,
      required: true
    },
    uniqueId: {
      type: String,
      unique: true
    }
  },
  {
    versionKey: false
  }
)

SensorSchema.pre('save', function () {
  this.uniqueId = `${this.thing_id}-${this.name}`
})

const Sensor = mongoose.model('Sensor', SensorSchema)

export { Sensor, SensorSchema }
