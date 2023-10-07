import { makeEditTransactionUseCase } from '@/use-cases/factories/transactions/make-edit-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editTransactionParamSchema = z.object({
    transactionId: z.string(),
  })

  const { transactionId } = editTransactionParamSchema.parse(request.params)

  const editTransactionBodySchema = z.object({
    value: z.number(),
    amount: z.number(),
    createdAt: z.coerce.date(),
  })

  const { value, amount, createdAt } = editTransactionBodySchema.parse(
    request.body,
  )

  const editTransactionUseCase = makeEditTransactionUseCase()

  await editTransactionUseCase.execute({
    amount,
    createdAt,
    transactionId,
    value,
  })

  return reply.status(200).send()
}
