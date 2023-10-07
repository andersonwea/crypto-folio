import { makeSearchUserCurrencyUseCase } from '@/use-cases/factories/currencies/make-search-user-currency-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const searchUserCurrencyQuerySchema = z.object({
    q: z.string().toLowerCase(),
  })

  const { q } = searchUserCurrencyQuerySchema.parse(request.query)

  const searchUserCurrencyUseCase = makeSearchUserCurrencyUseCase()

  const { userCurrenciesWithBalance } = await searchUserCurrencyUseCase.execute(
    {
      q,
      userId,
    },
  )

  return reply.status(200).send(userCurrenciesWithBalance)
}
