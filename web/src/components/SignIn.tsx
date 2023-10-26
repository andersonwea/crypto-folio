'use client'

import { Grid, Heading, Tabs, Text } from '@radix-ui/themes'
import logo from '@/assets/logo.svg'
import Image from 'next/image'
import { AuthenticateForm } from './AuthenticateForm'
import { RegisterForm } from './RegisterForm'

export function SignIn() {
  return (
    <Grid
      className="h-full w-full max-sm:py-5 px-32 max-xl:px-10 max-sm:px-2 overflow-y-auto"
      columns={{
        initial: '1',
        md: '1fr 0.7fr',
      }}
      gapX={'9'}
      gapY={'5'}
      align={'center'}
      justify={'center'}
    >
      <div className="bg-white rounded-[45px] lg:min-w-[500px] py-10 px-28 max-md:px-10 max-sm:px-3 space-y-4 max-lg:row-start-2 self-center max-lg:self-start">
        <Heading>Bem vindo!</Heading>
        <Tabs.Root defaultValue="authenticate">
          <Tabs.List>
            <Tabs.Trigger value="authenticate">Login</Tabs.Trigger>
            <Tabs.Trigger value="register">Cadastrar</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="authenticate">
            <AuthenticateForm />
          </Tabs.Content>

          <Tabs.Content value="register">
            <RegisterForm />
          </Tabs.Content>
        </Tabs.Root>
      </div>

      <div className="flex flex-col items-center">
        <Image src={logo} width={100} height={100} alt="logo do Crypto folio" />
        <Heading className="mt-2" style={{ color: 'white' }}>
          Crypto Folio
        </Heading>
        <Text style={{ color: 'white' }}>Seu portfolio de cryptos.</Text>
      </div>
    </Grid>
  )
}
