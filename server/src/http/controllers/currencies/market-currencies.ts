import { makeFetchApiCurrenciesUseCase } from '@/use-cases/factories/currencies/make-fetch-api-currencies-use-case'
import { AxiosError } from 'axios'
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

  try {
    const fetchApiCurrenciesUseCase = makeFetchApiCurrenciesUseCase()

    const { currencies } = await fetchApiCurrenciesUseCase.execute({
      page,
    })

    return reply.status(200).send(currencies)
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status ?? 500

      return reply.status(status).send({ error: err.message })
    }

    throw err
  }
}
