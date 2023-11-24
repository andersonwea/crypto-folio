import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Porfile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get profile', async () => {
    const { refreshToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        refreshToken: expect.any(String),
      }),
    )
  })
})
