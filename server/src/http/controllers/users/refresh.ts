import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  console.log('chamou a refresh')

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '10m',
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply.status(200).send({ accessToken, refreshToken })
}
