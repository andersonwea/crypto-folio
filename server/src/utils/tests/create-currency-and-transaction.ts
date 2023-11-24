import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export async function createCurrencyAndTransaction(user: User) {
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
}
