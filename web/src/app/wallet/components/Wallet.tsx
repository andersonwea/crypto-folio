import { Heading, ScrollArea } from '@radix-ui/themes'
import { Card } from './Card'
import { TextInput } from '@/components/TextInput'

export function Wallet() {
  const colors = ['bg-green-300', 'bg-purple-300', 'bg-yellow-300']

  return (
    <section className="pt-4">
      <div className="flex gap-3">
        <Heading as="h2">Seus Ativos</Heading>
        <TextInput placeholder="Filtrar ativos" />
      </div>

      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ maxWidth: 630, maxHeight: 255 }}
      >
        <div className="flex space-x-7 py-4">
          {[1, 2, 3, 4, 5].map((crypto, index) => (
            <Card key={crypto} color={colors[index % colors.length]} />
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}
