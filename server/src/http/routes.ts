import { FastifyInstance } from 'fastify'
import { register } from './controllers/users/register'
import { authenticate } from './controllers/users/authenticate'
import { refresh } from './controllers/users/refresh'
import { profile } from './controllers/users/profile'
import { verifyJWT } from './middlewares/verify-jwt'
import { metrics } from './controllers/users/metrics'
import { updateProfile } from './controllers/users/update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticate routes */
  app.get('/me', { onRequest: verifyJWT }, profile)
  app.get('/me/metrics', { onRequest: verifyJWT }, metrics)

  app.put('/me/profile', { onRequest: verifyJWT }, updateProfile)
}
