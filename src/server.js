import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
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
  
  server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })


  server.set('trust proxy', 1)

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 2 minutes
    max: 150, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  })

  server.use('/', limiter, router)


  

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