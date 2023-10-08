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

  const createTransactionUseCase = makeCreateTransactionUseCase()
  const updateUserCurrencyAmount = makeUpdateUserCurrencyAmountUseCase()

  await createTransactionUseCase.execute({
    amount,
    currencyId,
    type,
    value,
  })

  await updateUserCurrencyAmount.execute({
    currencyId,
  })

  return reply.status(201).send()
}
