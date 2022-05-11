import express from 'express'
import logger from 'morgan'
import router from './routers/router.js'

const main = async () => {
  const server = express()
  const port = process.env.PORT || 5000

  server.use(logger('dev'))
  server.use('/', router)

  server.listen(port, (req, res) => {
    console.log(`Server is running @ http://localhost:${port}`)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})