import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete a Transaction (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a transaction', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const currency = await prisma.currency.create({
      data: {
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 1,
        image: 'Bitcoin-image',
        cryptocurrency_id: 1,
        user_id: user.id,
      },
    })

    const transaction = await prisma.transaction.create({
      data: {
        amount: 1.3,
        type: 'buy',
        value: 2300000,
        currency_id: currency.id,
      },
    })

    const response = await request(app.server)
      .delete(`/wallet/currencies/transactions/${transaction.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const deletedTransaction = await prisma.transaction.findUnique({
      where: {
        id: transaction.id,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(deletedTransaction).toBeNull()
  })
})
