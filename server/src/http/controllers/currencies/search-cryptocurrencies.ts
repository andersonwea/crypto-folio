import { makeSearchCryptocurrenciesUseCase } from '@/use-cases/factories/currencies/make-search-cryptocurrencies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchCryptocurrencies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchSchema = z.object({
    search: z.string().toLowerCase(),
  })

  const { search } = searchSchema.parse(request.query)

  const searchCryptocurrenciesUseCase = makeSearchCryptocurrenciesUseCase()

  const { cryptocurrencies } = await searchCryptocurrenciesUseCase.execute({
    search,
  })

  return reply.status(200).send(cryptocurrencies)
}
