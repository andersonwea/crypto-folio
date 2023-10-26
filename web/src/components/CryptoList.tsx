import { ScrollArea, Text } from '@radix-ui/themes'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { NavPages } from '../app/market/components/NavPages'
import Link from 'next/link'

interface CryptoListProps {
  page?: string
  totalPages: number
}

export async function CryptoList({ page = '1', totalPages }: CryptoListProps) {
  return (
    <section>
      <ScrollArea
        scrollbars="both"
        type="auto"
        className="pr-10 py-2"
        style={{ height: '100%' }}
      >
        <table className="pt-7 w-full border-collapse">
          <thead>
            <tr className="space-x-10">
              <th></th>
              <th className="text-gray-500 sticky text-left max-sm:hidden">
                #
              </th>
              <th className="text-gray-500 sticky left-0 shadow-sm text-left">
                Nome
              </th>
              <th className="text-gray-500">Preço</th>
              <th className="text-gray-500">Valorização</th>
              <th className="text-gray-500">Cap. de Mercado</th>
              <th className="text-gray-500">Forn. Circulante</th>
            </tr>
          </thead>

          <tbody>
            {[1, 2, 3, 4, 5, 6, 7].map((row) => (
              <tr key={row}>
                <td>
                  <Star color="gray" size={20} />
                </td>
                <td className="text-left max-sm:hidden">1</td>
                <td className="sticky left-0 shadow-sm min-w-[150px]">
                  <Link href={'#'} className="flex items-center gap-2">
                    <div className="w-8 h-8">
                      <Image
                        src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                        alt="bitcoin logo"
                        width={32}
                        height={32}
                      />
                    </div>

                    <div className="text-base flex max-sm:flex-col gap-x-2 items-start">
                      <Text as="p">Bitcoin</Text>
                      <Text className="text-gray-500 text-sm" as="span">
                        BTC
                      </Text>
                    </div>
                  </Link>
                </td>
                <td>$ 27,556</td>
                <td>+13,25%</td>
                <td>$ 568.8M</td>
                <td>19.52M BTC</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
      <NavPages page={page} totalPages={totalPages} />
    </section>
  )
}
