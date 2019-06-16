const routes = require('express').Router()

const SessionController = require('./app/controllers/SessionController')

const authMiddleware = require('./app/middlewares/auth')

routes.post('/sessions', SessionController.store)

// apartir daqui todas as rotas abaixo vao ultilizar o authMiddleware
routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
  return res.status(200).send()
})
module.exports = routes
