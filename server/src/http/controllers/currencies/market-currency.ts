import { makeFetchApiCurrencyUseCase } from '@/use-cases/factories/currencies/make-fetch-api-currency-use-case'
import { AxiosError } from 'axios'
import { error } from 'console'
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

  try {
    const fetchApiCurrencyUseCase = makeFetchApiCurrencyUseCase()

    const { currency } = await fetchApiCurrencyUseCase.execute({
      id,
    })

    return reply.status(200).send(currency)
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status ?? 500

      return reply.status(status).send({ error: err.message })
    }

    throw err
  }
}
