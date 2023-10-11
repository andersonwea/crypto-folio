import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { metrics } from './metrics'
import { updateProfile } from './update-profile'
import { watchlist } from './watchlist'
import { toggleWatchlist } from './toggle-watchlist'
import { upload } from './upload'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticate routes */
  app.get('/me', { onRequest: verifyJWT }, profile)
  app.get('/me/metrics', { onRequest: verifyJWT }, metrics)
  app.get('/me/watchlist', { onRequest: verifyJWT }, watchlist)

  app.post('/me/watchlist', { onRequest: verifyJWT }, toggleWatchlist)

  app.put('/me/profile', { onRequest: verifyJWT }, updateProfile)

  app.post('/me/profile/upload', { onRequest: verifyJWT }, upload)
}
