import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe.skip('User Currency (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user currency', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const currency = await prisma.currency.create({
      data: {
        name: 'bitcoin',
        symbol: 'BTC',
        amount: 1,
        image: 'Bitcoin-image',
        cryptocurrency_id: 1,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/wallet/currencies/${currency.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'bitcoin',
        symbol: 'BTC',
      }),
    )
  })
})
