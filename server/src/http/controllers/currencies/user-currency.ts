import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFetchUserCurrencyUseCase } from '@/use-cases/factories/currencies/make-fetch-user-currency-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function userCurrency(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userCurrencyParamSchema = z.object({
    currencyId: z.string().uuid(),
  })

  const { currencyId } = userCurrencyParamSchema.parse(request.params)

  try {
    const fetchUserCurrencyUseCase = makeFetchUserCurrencyUseCase()

    const { userCurrencyWithBalance } = await fetchUserCurrencyUseCase.execute({
      currencyId,
    })

    return reply.status(200).send(userCurrencyWithBalance)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ error: err.message })
    }
  }
}
