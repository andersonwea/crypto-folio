import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Transaction (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a transaction', async () => {
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

    const response = await request(app.server)
      .post(`/wallet/currencies/${currency.id}/transactions`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'buy',
        value: 2700000,
        amount: 1,
      })

    expect(response.statusCode).toEqual(201)
  })
})
