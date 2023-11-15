'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button className="h-6 w-6 text-[#A5A5A5]" onClick={() => signOut()}>
      <LogOut size={26} />
    </button>
  )
}
