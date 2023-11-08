'use client'

import { useUserStore } from '@/store/useUserStore'
import { Avatar, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { useCallback, useEffect } from 'react'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const fetchUser = useUserStore(useCallback((state) => state.fetchUser, []))
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    fetchUser()
  }, [])

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
        className="min-w-[180px] py-4 bg-gray-300 rounded-3xl relative flex justify-end px-4"
        href={'/me'}
      >
        <Avatar
          className="absolute left-1 bottom-1 "
          src={user?.avatarUrl ? user.avatarUrl : ''}
          radius="full"
          color="orange"
          variant="solid"
          fallback={'A'}
          size={{
            initial: '4',
            sm: '5',
          }}
        />

        <Text className="pl-[64px] max-md:pl-[48px]">{user?.nickname}</Text>
      </Link>
    </header>
  )
}
