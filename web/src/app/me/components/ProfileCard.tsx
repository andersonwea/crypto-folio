import { getWalletStats } from '@/actions/getWalletStats'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { priceFormatter } from '@/utils/priceFormatter'
import { Avatar, Heading, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'

export async function ProfileCard() {
  const session = await getServerSession(authOptions)
  const { metrics } = await getWalletStats()

  return (
    <div className="flex justify-start max-md:justify-center max-md:row-start-1 items-center flex-wrap gap-4 pt-10">
      <div className="flex flex-col items-center border rounded-lg py-6 px-12 gap-3">
        <Avatar
          radius="full"
          color="orange"
          variant="solid"
          fallback={session?.user.nickname[0] || 'A'}
          src={session?.user.avatarUrl ?? ''}
          size={{
            initial: '7',
            xs: '8',
            sm: '8',
            md: '8',
          }}
        />
        <div>
          <Heading as="h2" size={'5'} className="text-center">
            {session?.user.nickname}
          </Heading>
          <Text color="gray">{session?.user.email}</Text>
        </div>

        <div className="flex flex-col mt-8 self-start">
          <Text color="gray">Balance</Text>
          <Text>
            {metrics && priceFormatter.format(metrics?.totalBalance)} 🚀
          </Text>
        </div>
      </div>
    </div>
  )
}
