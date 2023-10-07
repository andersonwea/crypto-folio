import { makeFetchUserTransactionsHistoryUseCase } from '@/use-cases/factories/transactions/make-fetch-user-transactions-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const transactionsHistoryQuerySchema = z.object({
    page: z.coerce.number().default(1),
  })

  const { page } = transactionsHistoryQuerySchema.parse(request.query)

  const fetchUserTransactionsHistoryUseCase =
    makeFetchUserTransactionsHistoryUseCase()

  const { transactions } = await fetchUserTransactionsHistoryUseCase.execute({
    userId,
    page,
  })

  return reply.status(200).send(transactions)
}
