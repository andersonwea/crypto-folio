import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get watchlist (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get watchlist', async () => {
    const { accessToken, user } = await createAndAuthenticateUser(app)

    await prisma.watchlist.create({
      data: {
        currency_id: 1,
        user_id: user.id,
      },
    })

    await prisma.watchlist.create({
      data: {
        currency_id: 3,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get('/me/watchlist')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      totalItems: 2,
      watchlist: [
        expect.objectContaining({
          id: 1,
        }),
        expect.objectContaining({
          id: 3,
        }),
      ],
    })
  })
})
