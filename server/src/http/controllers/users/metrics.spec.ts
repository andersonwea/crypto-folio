import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { createCurrencyAndTransaction } from '@/utils/tests/create-currency-and-transaction'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get metrics', async () => {
    const { accessToken, user } = await createAndAuthenticateUser(app)
    await createCurrencyAndTransaction(user)

    const response = await request(app.server)
      .get('/me/metrics')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        profitOrLoss: expect.any(Number),
        totalBalance: expect.any(Number),
        totalInvested: expect.any(Number),
      }),
    )
  })
})
