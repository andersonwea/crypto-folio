import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update porfile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update profile', async () => {
    const { accessToken } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .put('/me/profile')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nickname: 'Oni',
        avatarUrl: 'new-avatar-image',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        nickname: 'Oni',
        avatarUrl: 'new-avatar-image',
      }),
    )
  })
})
