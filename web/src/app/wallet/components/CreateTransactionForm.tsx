'use client'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { ScrollArea, Select, Text } from '@radix-ui/themes'
import { CurrencyItem } from './CurrencyItem'
import dayjs from 'dayjs'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransactionStore } from '@/store/useTransactionsStore'
import { useCallback } from 'react'

interface CreateTransactionFormProps {
  transactionType: string
}

const createTransactionFormSchema = z.object({
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

type CreateTransactionForm = z.infer<typeof createTransactionFormSchema>

function getActualDate() {
  const today = dayjs(new Date())

  return today.format('YYYY-MM-DD')
}

export function CreateTransactionForm({
  transactionType,
}: CreateTransactionFormProps) {
  const selectedMarketCurrency = useCurrencyStore(
    (state) => state.selectedMarketCurrency,
  )
  const marketCurrencies = useCurrencyStore((state) => state.marketCurrencies)
  const createTransaction = useTransactionStore(
    useCallback((state) => state.createTransaction, []),
  )
  const createWalletCurrency = useCurrencyStore(
    useCallback((state) => state.createWalletCurrency, []),
  )

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      amount: 0,
      currencyPrice: selectedMarketCurrency?.values.price ?? 0,
    },
  })

  const amount = watch('amount')
  const currencyPrice = watch('currencyPrice')

  async function handleCreateTransaction(data: CreateTransactionForm) {
    if (!selectedMarketCurrency) {
      return alert('Selecione uma moeda') // TODO add toastify lib
    }

    const { amount, createdAt } = data
    const { id, name, symbol, image } = selectedMarketCurrency
    const value = amount * currencyPrice
    const valueInCents = value * 100

    const currency = await createWalletCurrency({
      amount,
      cryptocurrencyId: id,
      image,
      name,
      symbol,
    })

    if (currency) {
      await createTransaction(
        {
          amount,
          createdAt,
          type: transactionType,
          value: valueInCents,
        },
        currency.id,
      )

      alert('Transação criada com sucesso.') // TODO: add toastify lib

      reset()
    }
  }

  return (
    <form
      className="pt-10 flex flex-col"
      onSubmit={handleSubmit(handleCreateTransaction)}
    >
      <Select.Root defaultValue={String(selectedMarketCurrency?.id)} size={'3'}>
        <Select.Trigger radius="large" color="gray" />

        <Select.Content color="gray">
          <ScrollArea type="auto" scrollbars="vertical" style={{ height: 200 }}>
            {marketCurrencies.map((marketCurrency) => (
              <Select.Item
                value={String(marketCurrency.id)}
                key={marketCurrency.id}
              >
                <CurrencyItem
                  currency={marketCurrency}
                  icon={false}
                  hover={false}
                  logoHeight={24}
                  logoWidth={24}
                />
              </Select.Item>
            ))}
          </ScrollArea>
        </Select.Content>
      </Select.Root>

      <div className="flex gap-4 pt-4">
        <label htmlFor="" className="w-full space-y-1">
          <Text>Quantidade</Text>
          <TextInput placeholder="0.00" type="number" {...register('amount')} />

          {errors.amount && (
            <Text color="red" size={'2'}>
              {errors.amount.message}
            </Text>
          )}
        </label>

        <label htmlFor="" className="w-full space-y-1">
          <Text>Preço por moeda</Text>
          <TextInput placeholder="0.00" {...register('currencyPrice')} />

          {errors.currencyPrice && (
            <Text color="red" size={'2'}>
              {errors.currencyPrice.message}
            </Text>
          )}
        </label>
      </div>

      <div className="max-w-[220px] mt-4">
        <TextInput
          type="date"
          defaultValue={getActualDate()}
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

      <Button disabled={isSubmitting} type="submit">
        Add transação
      </Button>
    </form>
  )
}
