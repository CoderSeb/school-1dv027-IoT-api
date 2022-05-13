import createError from 'http-errors'


export const authMiddleware = (req, res, next) => {
  try {
    if (!req.headers['x-iot-auth']) {
      return next(createError(404))
    }
    const key = req.headers['x-iot-auth']
    if (key !== process.env.API_KEY) {
      return next(createError(401))
    }
    next()
  } catch (err) {
    next(err)
  }
}