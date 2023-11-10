import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Transaction, useTransactionStore } from '@/store/useTransactionsStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, Flex, IconButton, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { Pencil, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditTransactionProps {
  transaction: Transaction
}

const editTransactionFormSchema = z.object({
  amount: z.coerce
    .number()
    .min(0.001, { message: 'Transação de no mínimo 0.001' }),
  currencyPrice: z.coerce
    .number()
    .min(0.001, { message: 'Preço de no mínimo 0.001' }),
  createdAt: z.coerce
    .date()
    .max(new Date(), { message: 'Data futura não permitida.' }),
})

type EditTransactionForm = z.infer<typeof editTransactionFormSchema>

export function EditTransaction({ transaction }: EditTransactionProps) {
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false)
  const editTransaction = useTransactionStore(
    useCallback((state) => state.editTransaction, []),
  )
  const transactionCurrencyPrice = transaction.value / 100 / transaction.amount

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditTransactionForm>({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: {
      amount: transaction.amount,
      currencyPrice: transactionCurrencyPrice,
    },
  })

  const amount = watch('amount')
  const currencyPrice = watch('currencyPrice')

  async function handleEditTransaction(data: EditTransactionForm) {
    const { amount, createdAt } = data
    const value = amount * currencyPrice
    const valueInCents = value * 100

    await editTransaction({
      amount,
      created_at: createdAt,
      value: valueInCents,
      id: transaction.id,
      currency_id: transaction.currency_id,
    })

    setIsEditTransactionModalOpen(false)
  }

  return (
    <Dialog.Root
      open={isEditTransactionModalOpen}
      onOpenChange={setIsEditTransactionModalOpen}
    >
      <Dialog.Trigger>
        <IconButton variant="ghost" color="gray">
          <Pencil size={18} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content style={{ borderRadius: 16, position: 'relative' }}>
        <Dialog.Title>Editar transação</Dialog.Title>

        <Dialog.Close className="absolute right-8 top-8">
          <IconButton variant="ghost" color="gray">
            <X />
          </IconButton>
        </Dialog.Close>

        <form
          onSubmit={handleSubmit(handleEditTransaction)}
          className="mt-2 flex flex-col"
        >
          <Flex
            className="mt-4"
            gap={'5'}
            direction={{
              initial: 'column',
              sm: 'row',
            }}
          >
            <label htmlFor="" className="w-full space-y-1">
              <Text>Quantidade</Text>
              <TextInput
                placeholder="0.00"
                type="number"
                defaultValue={transaction.amount}
                {...register('amount')}
              />

              {errors.amount && (
                <Text color="red" size={'2'}>
                  {errors.amount.message}
                </Text>
              )}
            </label>

            <label htmlFor="" className="w-full space-y-1">
              <Text>Preço por moeda</Text>
              <TextInput
                placeholder="0.00"
                defaultValue={transactionCurrencyPrice}
                {...register('currencyPrice')}
              />

              {errors.currencyPrice && (
                <Text color="red" size={'2'}>
                  {errors.currencyPrice.message}
                </Text>
              )}
            </label>
          </Flex>
          <div className="max-w-[220px] mt-4">
            <TextInput
              type="date"
              defaultValue={dayjs(transaction.created_at).format('YYYY-MM-DD')}
              {...register('createdAt')}
            />

            {errors.createdAt && (
              <Text color="red" size={'2'}>
                {errors.createdAt.message}
              </Text>
            )}
          </div>

          <label className="bg-gray-300 my-8 rounded-md py-3 px-4 space-y-4">
            <Text>Total gasto</Text>
            <input
              className="bg-transparent font-bold text-2xl block outline-0"
              readOnly={true}
              value={amount * currencyPrice}
            />
          </label>

          <Button type="submit">Editar transação</Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}