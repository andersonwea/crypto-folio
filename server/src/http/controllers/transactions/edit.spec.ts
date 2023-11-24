import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { Prisma } from '@prisma/client'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Edit a Transaction (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a transaction', async () => {
    const { accessToken, user } = await createAndAuthenticateUser(app)

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
      .put(`/wallet/currencies/${currency.id}/transactions/${transaction.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        value: 5400000,
        amount: 2,
        createdAt: new Date(),
      })

    const editedTransaction = await prisma.transaction.findUnique({
      where: {
        id: transaction.id,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(editedTransaction).toEqual(
      expect.objectContaining({
        value: 5400000,
        amount: new Prisma.Decimal(2),
      }),
    )
  })
})
