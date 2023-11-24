import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Market currency (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get market currency', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .get('/market/currencies/1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      }),
    )
  })
})
