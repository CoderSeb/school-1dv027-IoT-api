import mongoose from 'mongoose'

export const dbConnection = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const conn = mongoose.connection

  conn.on('error', (err) => {
    console.log(err)
  })

  conn.once('open', () => {
    console.log('Connected to MongoDB')
  })
}
