import { makeGetUserWatchlistUseCase } from '@/use-cases/factories/currencies/make-get-user-watchlist-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function watchlist(request: FastifyRequest, reply: FastifyReply) {
  const watchlistQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = watchlistQuerySchema.parse(request.query)

  const userId = request.user.sub

  const getUserWatchlistUseCase = makeGetUserWatchlistUseCase()

  const { watchlist, totalItems } = await getUserWatchlistUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send({ totalItems, watchlist })
}
