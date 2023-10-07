import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { marketCurrencies } from './market-currencies'
import { marketCurrency } from './market-currency'
import { create } from './create'
import { userCurrencies } from './user-currencies'
import { userCurrency } from './user-currency'
import { search } from './search'

export async function currenciesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/market/currencies', marketCurrencies)
  app.get('/market/currencies/:id', marketCurrency)
  app.get('/wallet/currencies', userCurrencies)
  app.get('/wallet/currencies/:currencyId', userCurrency)
  app.get('/wallet/currencies/search', search)

  app.post('/wallet/currencies', create)
}
