import express from 'express'
import createError from 'http-errors'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})


router.use('*', (req, res, next) => {
  next(createError(404))
})

export default router