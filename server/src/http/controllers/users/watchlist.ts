import { makeGetUserWatchlistUseCase } from '@/use-cases/factories/currencies/make-get-user-watchlist-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function watchlist(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const getUserWatchlistUseCase = makeGetUserWatchlistUseCase()

  const { watchlist } = await getUserWatchlistUseCase.execute({
    userId,
  })

  return reply.status(200).send(watchlist)
}
