'use client'

import Link from 'next/link'
import { Nav } from './Nav'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import logo from '@/assets/logo.svg'
import cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

export function MenuNav() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)

  function signOut() {
    cookies.remove('cryptofolio.token')

    setUser(null)
    setAuthenticated(false)

    router.refresh()
  }

  return (
    <div className="flex flex-col items-center lg:mt-6 lg:mb-6 max-lg:flex-row max-lg:row-start-2 max-lg:justify-evenly max-[450px]:justify-between max-[450px]:px-4">
      <Link href={'/'} className="max-md:hidden">
        <Image src={logo} alt="crypto folio logo" />
      </Link>

      <Nav />

      <button className="h-6 w-6 text-[#A5A5A5]" onClick={() => signOut()}>
        <LogOut size={26} />
      </button>
    </div>
  )
}
