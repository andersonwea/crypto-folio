import { app } from '@/app'
import { createUserCurrencyAndTransaction } from '@/utils/tests/create-user-currency-and-transaction'
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
    const { token } = await createUserCurrencyAndTransaction(app)

    const response = await request(app.server)
      .get('/me/metrics')
      .set('Authorization', `Bearer ${token}`)
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
