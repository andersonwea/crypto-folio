import { Heading } from '@radix-ui/themes'

export function EmptyCard() {
  return (
    <div className="rounded-3xl text-center px-9 py-6 min-h-[222px] flex flex-col justify-center max-w-[194px] bg-green-300">
      <Heading>Carteira vazia</Heading>
    </div>
  )
}
