import { Heading } from "@radix-ui/themes";
import { Card } from "./Card";

export function Wallet() {
  return (
    <section className="pt-7 ">
      <Heading as="h2">Seus Ativos</Heading>

      <div className="flex max-w-[630px] space-x-7 py-5 overflow-y-hidden overflow-scroll">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

    </section>
  )
}