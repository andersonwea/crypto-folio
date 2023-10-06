import { makeGetUserMetricsUseCase } from '@/use-cases/factories/users/make-get-user-metrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { profitOrLoss, totalBalance, totalInvested } =
    await getUserMetricsUseCase.execute({
      userId,
    })

  return reply.status(200).send({ profitOrLoss, totalBalance, totalInvested })
}
