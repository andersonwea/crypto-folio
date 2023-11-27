import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Avatar, Heading, Text } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

interface HeaderProps {
  title: string
}

export async function Header({ title }: HeaderProps) {
  const session = await getServerSession(authOptions)

  return (
    <header className="flex justify-between items-center pt-3">
      <Heading
        size={{
          initial: '6',
          sm: '8',
        }}
      >
        {title}
      </Heading>

      <Link
        className="py-4 bg-gray-300 rounded-3xl relative flex justify-end px-4"
        href={'/me'}
      >
        <Avatar
          className="absolute left-1 bottom-1 "
          src={session?.user.avatarUrl ? session?.user.avatarUrl : ''}
          radius="full"
          color="orange"
          variant="solid"
          fallback={session?.user.nickname[0] || 'A'}
          size={{
            initial: '4',
            sm: '5',
          }}
        />

        <Text className="pl-[64px] max-md:pl-[48px]">
          {session?.user.nickname}
        </Text>
      </Link>
    </header>
  )
}
