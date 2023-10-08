import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteTransactionUseCase } from '@/use-cases/factories/transactions/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeTransactionParamSchema = z.object({
    transactionId: z.string(),
  })

  const { transactionId } = removeTransactionParamSchema.parse(request.params)

  try {
    const deleteTransactionUseCase = makeDeleteTransactionUseCase()

    await deleteTransactionUseCase.execute({
      transactionId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
