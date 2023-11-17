import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const accessToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '30m',
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

  const tenMinutesInMilliseconds = 1000 * 60 * 30

  const expireIn = new Date().getTime() + tenMinutesInMilliseconds

  return reply.status(200).send({ accessToken, refreshToken, expireIn })
}
