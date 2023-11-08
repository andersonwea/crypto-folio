'use client'

import { Header } from '@/components/Header'
import { Avatar, Grid, Heading, Text } from '@radix-ui/themes'
import { UpdateProfileForm } from './components/UpdateProfileForm'
import { UpdatePrivacyProfileForm } from './components/UpdatePrivacyProfileForm'
import { useUserStore } from '@/store/useUserStore'
import { useCallback } from 'react'

export default function Profile() {
  const user = useUserStore(useCallback((state) => state.user, []))

  return (
    <div>
      <Header title="Meu perfil" />

      <main className="pt-7">
        <Heading>Atualizar perfil</Heading>

        <div className="flex items-center flex-wrap gap-4 pt-10">
          <Avatar
            className=""
            radius="full"
            color="orange"
            variant="solid"
            fallback={'A'}
            src={user?.avatarUrl}
            size={{
              initial: '4',
              sm: '5',
              md: '7',
            }}
          />
          <div>
            <Heading as="h2" size={'5'}>
              {user?.nickname}
            </Heading>
            <Text color="gray">{user?.email}</Text>
          </div>
        </div>

        <Grid
          gap={{ initial: '5', sm: '6', lg: '8' }}
          columns={{ initial: '1', sm: '2' }}
        >
          <UpdateProfileForm />
          <UpdatePrivacyProfileForm />
        </Grid>
      </main>
    </div>
  )
}
