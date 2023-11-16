'use client'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Text } from '@radix-ui/themes'
import { CurrencyItem } from './CurrencyItem'
import dayjs from 'dayjs'
import { useCurrencyStore } from '@/store/useCurrencyStore'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { addWalletCurrency } from '@/actions/addWalletCurrency'
import { addTransaction } from '@/actions/addTransaction'
import { useStore } from '@/store/useStore'

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
  const activeSearch = useCurrencyStore(
    useCallback((state) => state.activeSearch, []),
  )
  const setActiveSearch = useCurrencyStore(
    useCallback((state) => state.setActiveSearch, []),
  )
  const selectedMarketCurrency = useCurrencyStore(
    useCallback((state) => state.selectedMarketCurrency, []),
  )
  const setIsTransactionModalOpen = useStore(
    useCallback((state) => state.setIsTransactionModalOpen, []),
  )

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionForm>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      amount: 0,
      currencyPrice: selectedMarketCurrency?.values.price ?? 0,
    },
  })

  useEffect(() => {
    setValue('currencyPrice', selectedMarketCurrency?.values.price ?? 0)
  }, [selectedMarketCurrency])

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

    const addWalletCurrencyResponse = await addWalletCurrency({
      amount,
      cryptocurrencyId: id,
      image,
      name,
      symbol,
    })

    if (addWalletCurrencyResponse?.addWalletCurrencyError) {
      return alert('Erro ao adicionar cryptomoeda') // TODO: add toastify lib
    }

    if (addWalletCurrencyResponse?.walletCurrency) {
      const currencyId = addWalletCurrencyResponse.walletCurrency.id

      const addTransactionResponse = await addTransaction(
        {
          amount,
          createdAt,
          type: transactionType,
          value: valueInCents,
        },
        currencyId,
      )

      if (addTransactionResponse?.addTransactionError) {
        return alert(addTransactionResponse?.addTransactionError)
      }

      alert('Transação criada com sucesso.') // TODO: add toastify lib
      setIsTransactionModalOpen(false)
      reset()
    }
  }

  function handleClickSearchItem() {
    setActiveSearch(true)
  }

  return (
    <form
      className="pt-10 flex flex-col"
      onSubmit={handleSubmit(handleCreateTransaction)}
    >
      {selectedMarketCurrency &&
        (activeSearch ? (
          <SearchBar />
        ) : (
          <div>
            <CurrencyItem
              onClick={handleClickSearchItem}
              currency={selectedMarketCurrency}
              logoHeight={26}
              logoWidth={26}
            />
          </div>
        ))}

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
