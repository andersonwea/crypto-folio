'use client'

import { Button } from '@/components/Button'
import { TextInput } from '@/components/TextInput'
import { Heading, Text } from '@radix-ui/themes'
import dayjs from 'dayjs'

function getActualDate() {
  const today = dayjs(new Date())

  return today.format('YYYY-MM-DD')
}
console.log(getActualDate())

export function CreateTransactionForm() {
  return (
    <form className="pt-4 flex flex-col">
      <div className="flex gap-4">
        <label htmlFor="" className="w-full">
          <Text>Quantidade</Text>
          <TextInput placeholder="0.00" />
        </label>

        <label htmlFor="" className="w-full">
          <Text>Preço por moeda</Text>
          <TextInput value={'34000,09'} placeholder="0.00" />
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
