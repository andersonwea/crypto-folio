import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe.skip('Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get metrics', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/market')
      .set('Authorization', `Bearer ${token}`)
      .send({
        page: 1,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveLength(7)
  })
})
