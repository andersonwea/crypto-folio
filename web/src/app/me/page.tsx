import { Header } from '@/components/Header'
import { Avatar, Grid, Heading, Text } from '@radix-ui/themes'
import { UpdateProfileForm } from './components/UpdateProfileForm'
import { UpdatePrivacyProfileForm } from './components/UpdatePrivacyProfileForm'

export default function Profile() {
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
            size={{
              initial: '4',
              sm: '5',
              md: '7',
            }}
          />
          <div>
            <Heading as="h2" size={'5'}>
              username
            </Heading>
            <Text color="gray">email@example.com</Text>
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
