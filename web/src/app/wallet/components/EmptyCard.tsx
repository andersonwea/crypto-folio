import { Heading } from '@radix-ui/themes'
import { PlusSquare } from 'lucide-react'
import { TransactionModal } from './TransactionModal'

export function EmptyCard() {
  return (
    <div className="bg-green-300 rounded-3xl px-9 py-6 h-[229px] max-w-[194px] flex flex-col justify-center items-center gap-4">
      <Heading as="h3" className="text-center font-normal">
        Primeira transação
      </Heading>
      <TransactionModal>
        <button className="hover:brightness-95 bg-green-300 rounded-md p-1">
          <PlusSquare size={46} />
        </button>
      </TransactionModal>
    </div>
  )
}
