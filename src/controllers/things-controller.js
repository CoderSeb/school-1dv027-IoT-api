export default class ThingsController {
  async sayHello(req, res, next) {
    res.send('Hello World! from things controller')
  }
}