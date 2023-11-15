import Link from 'next/link'
import { Nav } from './Nav'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import { SignOutButton } from './SignOutButton'

export function MenuNav() {
  return (
    <div className="flex flex-col items-center lg:mt-6 lg:mb-6 max-lg:flex-row max-lg:row-start-2 max-lg:justify-evenly max-[450px]:justify-between max-[450px]:px-4">
      <Link href={'/'} className="max-md:hidden">
        <Image src={logo} alt="crypto folio logo" />
      </Link>

      <Nav />

      <SignOutButton />
    </div>
  )
}
