import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { metrics } from './metrics'
import { updateProfile } from './update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticate routes */
  app.get('/me', { onRequest: verifyJWT }, profile)
  app.get('/me/metrics', { onRequest: verifyJWT }, metrics)

  app.put('/me/profile', { onRequest: verifyJWT }, updateProfile)
}
