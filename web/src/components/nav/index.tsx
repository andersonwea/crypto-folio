'use client'

import { BarChart2, LayoutDashboard, Star, User2, Wallet } from 'lucide-react'
import { NavButton } from './navButton'
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
    url: '/profile',
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
    <nav className="flex flex-col space-y-16">
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
