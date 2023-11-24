import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Currencies (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user currencies', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/wallet/currencies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Bitcoin',
        symbol: 'BTC',
        amount: 1,
        image: 'Bitcoin-image',
        cryptocurrencyId: 1,
      })

    await request(app.server)
      .post('/wallet/currencies')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Ethereum',
        symbol: 'ETH',
        amount: 1.5,
        image: 'Ethereum-image',
        cryptocurrencyId: 3,
      })

    const response = await request(app.server)
      .get('/wallet/currencies/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        q: 'bitcoin',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'bitcoin',
        symbol: 'BTC',
      }),
    ])
  })
})
