import { InvalidTransactionError } from '@/use-cases/errors/invalid-transaction-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUserCurrencyAmountUseCase } from '@/use-cases/factories/currencies/make-update-user-currency-amount-use-case'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/transactions/make-create-trasanction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionParamSchema = z.object({
    currencyId: z.string(),
  })

  const createTransactionBodySchema = z.object({
    type: z.enum(['buy', 'sell']),
    value: z.number(),
    amount: z.number(),
  })

  const { currencyId } = createTransactionParamSchema.parse(request.params)

  const { type, value, amount } = createTransactionBodySchema.parse(
    request.body,
  )

  try {
    const createTransactionUseCase = makeCreateTransactionUseCase()
    const updateUserCurrencyAmountUseCase =
      makeUpdateUserCurrencyAmountUseCase()

    await createTransactionUseCase.execute({
      amount,
      currencyId,
      type,
      value,
    })

    await updateUserCurrencyAmountUseCase.execute({
      currencyId,
    })
  } catch (err) {
    if (err instanceof InvalidTransactionError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
