import { Flex, Text } from '@radix-ui/themes'

interface CardItemProps {
  title: string
  value: string
  extra?: string
}

export function CardItem({ title, value, extra }: CardItemProps) {
  return (
    <Flex
      justify={'between'}
      className="p-2 border-b-[1px] border-zinc-400 last:border-b-0"
    >
      <Text className="text-zinc-400">{title}</Text>

      <div className="text-end">
        <Text className="block">{value}</Text>
        {extra && <Text className="text-zinc-400">92.77%</Text>}
      </div>
    </Flex>
  )
}
