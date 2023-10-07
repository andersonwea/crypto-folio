import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Transactions History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch transactions history', async () => {
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

    await prisma.transaction.create({
      data: {
        amount: 1,
        type: 'buy',
        value: 2000000,
        currency_id: currency.id,
      },
    })

    await prisma.transaction.create({
      data: {
        amount: 1.3,
        type: 'buy',
        value: 2300000,
        currency_id: currency.id,
      },
    })

    const response = await request(app.server)
      .get('/wallet/currencies/transactions')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        type: 'buy',
        value: 2000000,
      }),
      expect.objectContaining({
        type: 'buy',
        value: 2300000,
      }),
    ])
  })
})
