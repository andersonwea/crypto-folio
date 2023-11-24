import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Cryptocurrencies (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search cryptocurrencies', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    await prisma.cryptocurrency.createMany({
      data: [
        {
          id: 1,
          name: 'bitcoin',
          symbol: 'BTC',
          image: 'btc-image',
        },
        {
          id: 2,
          name: 'ethereum',
          symbol: 'ETH',
          image: 'ethereum-image',
        },
        {
          id: 3,
          name: 'solana',
          symbol: 'SOL',
          image: 'solana-image',
        },
      ],
    })

    const response = await request(app.server)
      .get('/market/currencies/search')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        search: 'bitcoin',
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
