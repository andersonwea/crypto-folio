import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { marketCurrencies } from './market-currencies'

export async function currenciesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/market', marketCurrencies)
}
