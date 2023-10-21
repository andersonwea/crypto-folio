import { Heading, ScrollArea } from '@radix-ui/themes'
import { Card } from './Card'

export function Wallet() {
  return (
    <section className="pt-4">
      <Heading as="h2">Seus Ativos</Heading>

      <ScrollArea
        type="always"
        scrollbars="horizontal"
        style={{ maxWidth: 630, maxHeight: 255 }}
      >
        <div className="flex space-x-7 py-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </ScrollArea>
    </section>
  )
}
