import { makeCreateCurrencyUseCase } from '@/use-cases/factories/currencies/make-create-currency-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const createCurrencyBodySchema = z.object({
    cryptocurrencyId: z.number(),
    name: z.string().toLowerCase(),
    symbol: z.string(),
    image: z.string(),
    amount: z.number(),
  })

  const { cryptocurrencyId, name, symbol, image, amount } =
    createCurrencyBodySchema.parse(request.body)

  const createCurrencyUseCase = makeCreateCurrencyUseCase()

  const { currency } = await createCurrencyUseCase.execute({
    amount,
    cryptocurrencyId,
    image,
    name,
    symbol,
    userId,
  })

  return reply.status(201).send(currency)
}
