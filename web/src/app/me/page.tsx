import { Header } from '@/components/Header'
import { Grid, Heading } from '@radix-ui/themes'
import { UpdateProfileForm } from './components/UpdateProfileForm'
import { ProfileCard } from './components/ProfileCard'

export default async function Profile() {
  return (
    <div>
      <Header title="Meu perfil" />

      <main className="pt-7">
        <Heading>Atualizar perfil</Heading>

        <Grid
          className="mt-8"
          gap={{ initial: '5', sm: '6', lg: '8' }}
          columns={{ initial: '1', sm: '2' }}
        >
          <UpdateProfileForm />
          <ProfileCard />
          {/* <UpdatePrivacyProfileForm /> */}
        </Grid>
      </main>
    </div>
  )
}
