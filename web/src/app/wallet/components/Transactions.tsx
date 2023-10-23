import { Heading, IconButton, ScrollArea, Text } from '@radix-ui/themes'
import { Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { TransactionModal } from './TransactionModal'
import { Button } from '@/components/Button'

export function Transactions() {
  return (
    <section className="pt-7">
      <header className="flex items-center justify-between">
        <Heading as="h2">Transações</Heading>

        <TransactionModal>
          <Button>Add transação</Button>
        </TransactionModal>
      </header>

      <ScrollArea className="pt-1" type="auto" style={{ maxHeight: 358 }}>
        <table className="pt-7 w-full border-collapse">
          <thead>
            <tr className="space-x-10">
              <th className="text-left sticky left-0">
                <Text color="gray">Tipo</Text>
              </th>
              <th>
                <Text color="gray">Preço</Text>
              </th>
              <th>
                <Text color="gray">Valor</Text>
              </th>
              <th>
                <Text color="gray">Qtd</Text>
              </th>
              <th>
                <Text color="gray">Ações</Text>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="flex items-center gap-3 sticky left-0 shadow-sm min-w-[150px]">
                <div className="w-8 h-8">
                  <Image
                    src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                    alt="bitcoin logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <Heading as="h2" size={'3'}>
                    Compra Bitcoin
                  </Heading>
                  <Text as="span" size={'2'}>
                    7 de Set de 2023, 13:13
                  </Text>
                </div>
              </td>
              <td>$ 25,888</td>
              <td>$ 25,888</td>
              <td>+1 BTC</td>
              <td>
                <div className="flex gap-2 justify-end">
                  <IconButton variant="ghost" color="gray">
                    <Pencil size={20} />
                  </IconButton>
                  <IconButton variant="ghost" color="gray">
                    <Trash2 size={20} />
                  </IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>
    </section>
  )
}
