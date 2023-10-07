import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { marketCurrencies } from './market-currencies'
import { marketCurrency } from './market-currency'
import { create } from './create'

export async function currenciesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/market', marketCurrencies)
  app.get('/market/:id', marketCurrency)

  app.post('/currencies', create)
}
