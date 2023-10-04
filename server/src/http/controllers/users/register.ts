import { ResourceAlreadyExitsError } from '@/use-cases/errors/resource-already-exists-error'
import { makeRegisterUserCase } from '@/use-cases/factories/users/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { undefined, z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nickname: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { nickname, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUserCase()

    const { user } = await registerUseCase.execute({
      email,
      nickname,
      password,
    })

    return reply.status(201).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceAlreadyExitsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
