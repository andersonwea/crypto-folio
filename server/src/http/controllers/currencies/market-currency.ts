import { makeFetchApiCurrencyUseCase } from '@/use-cases/factories/currencies/make-fetch-api-currency-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function marketCurrency(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const marketCurrencyParamSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = marketCurrencyParamSchema.parse(request.params)

  const fetchApiCurrencyUseCase = makeFetchApiCurrencyUseCase()

  const { currency } = await fetchApiCurrencyUseCase.execute({
    id,
  })

  return reply.status(200).send(currency)
}
