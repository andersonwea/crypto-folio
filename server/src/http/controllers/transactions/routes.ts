import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { history } from './history'
import { remove } from './remove'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/wallet/currencies/transactions', create)

  app.get('/wallet/currencies/transactions', history)

  app.delete('/wallet/currencies/transactions/:transactionId', remove)
}
