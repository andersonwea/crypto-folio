import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Currency (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a currency', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/wallet/currencies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 1,
        image: 'Bitcoin-image',
        cryptocurrencyId: 1,
      })

    expect(response.statusCode).toEqual(201)
  })
})
