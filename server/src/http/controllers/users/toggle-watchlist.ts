import { makeToggleCurrencyToWatchlist } from '@/use-cases/factories/currencies/make-toggle-currency-to-watchlist-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function toggleWatchlist(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  const watchlistBodySchema = z.object({
    currencyId: z.number(),
  })

  const { currencyId } = watchlistBodySchema.parse(request.body)

  const toggleCurrencyToWatchlist = makeToggleCurrencyToWatchlist()

  await toggleCurrencyToWatchlist.execute({
    userId,
    currencyId,
  })

  return reply.status(200).send()
}
