import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/wallet/currencies/transactions', create)
}
