import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUserCurrencyAmountUseCase } from '@/use-cases/factories/currencies/make-update-user-currency-amount-use-case'
import { makeEditTransactionUseCase } from '@/use-cases/factories/transactions/make-edit-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editTransactionParamSchema = z.object({
    transactionId: z.string(),
    currencyId: z.string(),
  })

  const { transactionId, currencyId } = editTransactionParamSchema.parse(
    request.params,
  )

  const editTransactionBodySchema = z.object({
    value: z.number(),
    amount: z.number(),
    createdAt: z.coerce.date(),
  })

  const { value, amount, createdAt } = editTransactionBodySchema.parse(
    request.body,
  )

  try {
    const editTransactionUseCase = makeEditTransactionUseCase()
    const updateUserCurrencyAmountUseCase =
      makeUpdateUserCurrencyAmountUseCase()

    await editTransactionUseCase.execute({
      amount,
      createdAt,
      transactionId,
      value,
    })

    await updateUserCurrencyAmountUseCase.execute({
      currencyId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
