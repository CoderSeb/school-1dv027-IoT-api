import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import { dbConnection } from './config/mongodb.js'
import router from './routers/router.js'


dotenv.config()

const main = async () => {
  const server = express()
  const port = process.env.PORT || 5000

  await dbConnection()
  server.use(express.json())
  server.use(logger('dev'))
  server.use('/', router)

  // Errors
  server.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
  })

  server.listen(port, (req, res) => {
    console.log(`Server is running @ http://localhost:${port}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})