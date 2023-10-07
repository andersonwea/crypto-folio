import { makeFetchUserCurrenciesUseCase } from '@/use-cases/factories/currencies/make-fetch-user-currencies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function userCurrencies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const fetchUserCurrenciesUseCase = makeFetchUserCurrenciesUseCase()

  const { userCurrenciesWithBalance } =
    await fetchUserCurrenciesUseCase.execute({
      userId,
    })

  return reply.status(200).send(userCurrenciesWithBalance)
}
