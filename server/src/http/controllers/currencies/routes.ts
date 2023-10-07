import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { marketCurrencies } from './market-currencies'
import { marketCurrency } from './market-currency'
import { create } from './create'
import { userCurrencies } from './user-currencies'

export async function currenciesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/market/currencies', marketCurrencies)
  app.get('/market/currencies/:id', marketCurrency)
  app.get('/wallet/currencies', userCurrencies)

  app.post('/wallet/currencies', create)
}
