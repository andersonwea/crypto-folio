import { makeFetchApiCurrenciesUseCase } from '@/use-cases/factories/currencies/make-fetch-api-currencies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function marketCurrencies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const marketCurrenciesQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = marketCurrenciesQuerySchema.parse(request.query)

  const fetchApiCurrenciesUseCase = makeFetchApiCurrenciesUseCase()

  const { currencies } = await fetchApiCurrenciesUseCase.execute({
    page,
  })

  return reply.status(200).send(currencies)
}
