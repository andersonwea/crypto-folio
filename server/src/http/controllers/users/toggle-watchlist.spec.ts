import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Toggle watchlist (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to toggle a currency into watchlist', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/me/watchlist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currencyId: 1,
      })

    expect(response.statusCode).toEqual(200)
  })
})
