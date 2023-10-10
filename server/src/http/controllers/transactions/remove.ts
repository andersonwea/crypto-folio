import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUserCurrencyAmountUseCase } from '@/use-cases/factories/currencies/make-update-user-currency-amount-use-case'
import { makeDeleteTransactionUseCase } from '@/use-cases/factories/transactions/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeTransactionParamSchema = z.object({
    transactionId: z.string(),
    currencyId: z.string(),
  })

  const { transactionId, currencyId } = removeTransactionParamSchema.parse(
    request.params,
  )

  try {
    const deleteTransactionUseCase = makeDeleteTransactionUseCase()
    const updateUserCurrencyAmountUseCase =
      makeUpdateUserCurrencyAmountUseCase()

    await deleteTransactionUseCase.execute({
      transactionId,
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
