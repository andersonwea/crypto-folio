import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/users/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const accessToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '30m',
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    const tenMinutesInMilliseconds = 1000 * 60 * 30

    const expireIn = new Date().getTime() + tenMinutesInMilliseconds

    return reply.send({
      accessToken,
      refreshToken,
      expireIn,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
