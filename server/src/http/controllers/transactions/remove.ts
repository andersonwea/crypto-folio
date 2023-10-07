import { makeDeleteTransactionUseCase } from '@/use-cases/factories/transactions/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeTransactionParamSchema = z.object({
    transactionId: z.string(),
  })

  const { transactionId } = removeTransactionParamSchema.parse(request.params)

  const deleteTransactionUseCase = makeDeleteTransactionUseCase()

  await deleteTransactionUseCase.execute({
    transactionId,
  })

  return reply.status(200).send()
}
