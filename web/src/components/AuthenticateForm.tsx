'use client'

import { Text } from '@radix-ui/themes'
import { TextInput } from './TextInput'
import Image from 'next/image'
import googleIcon from '@/assets/google.svg'
import { Button } from './Button'

export function AuthenticateForm() {
  return (
    <form className="flex flex-col space-y-10">
      <div className="space-y-5 mt-10">
        <label htmlFor="" className="block space-y-1">
          <Text>Email</Text>
          <TextInput placeholder="insira o endereço de email" />
        </label>

        <label htmlFor="" className="block space-y-1">
          <Text>Senha</Text>
          <TextInput type="password" placeholder="insira sua senha" />
        </label>
      </div>

      <div className="flex flex-col space-y-4">
        <Button>Login</Button>
        <Text className='flex items-center gap-2 before:content-[""] before:block before:bg-gray-300 before:w-full before:h-[2px] after:content-[""] after:block after:bg-gray-300 after:w-full after:h-[2px]'>
          ou
        </Text>
        <button className="flex items-end justify-center gap-4 border-[2px] rounded-xl py-[6px] hover:bg-gray-50">
          {' '}
          <Image src={googleIcon} width={28} height={28} alt="" />
          Continue com Google
        </button>
      </div>
    </form>
  )
}
