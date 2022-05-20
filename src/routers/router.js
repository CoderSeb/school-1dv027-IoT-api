import express from 'express'
import createError from 'http-errors'
import thingsRouter from './things/router.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the terra temp api!'
  })
})

router.use('/things', thingsRouter)

router.use('*', (req, res, next) => {
  next(createError(404))
})

export default router