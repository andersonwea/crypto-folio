import { Avatar, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <Heading
        size={{
          initial: "6",
          sm: "8"
        }}
      >
        Visão Geral
      </Heading>

      <Link 
        className="min-w-[180px] py-4 bg-gray-300 rounded-3xl relative flex justify-end px-4"
        href={"/me"}
      >
        <Avatar
          className="absolute left-1 bottom-1 "
          radius="full"
          color="orange" 
          variant="solid"
          fallback={'A'}
          size={{
            initial: '4',
            sm: '5'
          }}
        />

        <Text className="pl-[64px] max-md:pl-[48px]">nicknameee</Text>
      </Link>

    </header>
  )
}