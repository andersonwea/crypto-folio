'use client'

import { BarChart2, LayoutDashboard, Star, User2, Wallet } from 'lucide-react'
import { NavButton } from './NavButton'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const navigation = [
  {
    url: '/',
    icon: <LayoutDashboard size={26} />,
  },
  {
    url: '/wallet',
    icon: <Wallet size={26} />,
  },
  {
    url: '/market',
    icon: <BarChart2 size={26} />,
  },
  {
    url: '/watchlist',
    icon: <Star size={26} />,
  },
  {
    url: '/me',
    icon: <User2 size={26} />,
  },
]

export function Nav() {
  const [activeUrl, setActiveUrl] = useState<string | null>('/')

  const router = useRouter()

  function handleClick(activeUrl: string) {
    setActiveUrl(activeUrl)

    router.push(activeUrl)
  }

  return (
    <nav className="flex flex-col lg:space-y-16 max-sm:space-x-8 max-md:space-x-12 max-lg:space-x-16 max-lg:flex-row lg:mb-auto lg:mt-16">
      {navigation.map(({ url, icon }) => (
        <NavButton
          key={url}
          icon={icon}
          isActive={activeUrl === url}
          onClick={() => handleClick(url)}
        />
      ))}
    </nav>
  )
}
