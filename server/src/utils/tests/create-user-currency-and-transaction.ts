import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { createAndAuthenticateUser } from './create-and-authenticate-user'

export async function createUserCurrencyAndTransaction(app: FastifyInstance) {
  const { user, token } = await createAndAuthenticateUser(app)

  const currency = await prisma.currency.create({
    data: {
      amount: 1,
      cryptocurrency_id: 1,
      image: 'crypto-image',
      name: 'Bitcoin',
      symbol: 'BTC',
      user_id: user.id,
    },
  })

  await prisma.transaction.create({
    data: {
      amount: 1,
      type: 'buy',
      value: 2000000,
      currency_id: currency.id,
    },
  })

  return {
    user,
    token,
    currency,
  }
}
