'use client'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Heading, ScrollArea, Select, Text } from '@radix-ui/themes'
import { Currency } from './Currency'
import dayjs from 'dayjs'
import { useSelectCurrency } from '@/hooks/useSelectCurrency'

interface CreateTransactionFormProps {
  transactionType: string
}

function getActualDate() {
  const today = dayjs(new Date())

  return today.format('YYYY-MM-DD')
}

export function CreateTransactionForm({
  transactionType,
}: CreateTransactionFormProps) {
  const currency = useSelectCurrency((state) => state.currency)

  return (
    <form className="pt-10 flex flex-col">
      <Select.Root defaultValue={currency} size={'3'}>
        <Select.Trigger radius="large" color="gray" />

        <Select.Content color="gray">
          <ScrollArea type="auto" scrollbars="vertical" style={{ height: 200 }}>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <Select.Item value={`bitcoin${item}`} key={item}>
                <Currency
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
          <TextInput placeholder="0.00" />
        </label>

        <label htmlFor="" className="w-full space-y-1">
          <Text>Preço por moeda</Text>
          <TextInput defaultValue={'34000,09'} placeholder="0.00" />
        </label>
      </div>

      <div className="max-w-[220px] mt-4">
        <TextInput type="date" defaultValue={getActualDate()} />
      </div>

      <div className="bg-gray-300 my-8 rounded-md py-3 px-4 space-y-4">
        <Text>Total gasto</Text>
        <Heading as="h2">$ 25,588.30</Heading>
      </div>

      <Button>Add transação</Button>
    </form>
  )
}
