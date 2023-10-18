import { Heading, ScrollArea, Table, Text } from "@radix-ui/themes";
import { Star } from "lucide-react";
import Image from "next/image";

export function Market() {
  return (
    <section className="mt-7 col-span-2">
      <Heading>Mercado</Heading>

      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={{ height: 365}}
      >
        <Table.Root size={"3"} className="pt-7">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">#</Table.RowHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">Nome</Table.RowHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">Preço</Table.RowHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">Valorização</Table.RowHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">Cap. de Mercado</Table.RowHeaderCell>
              <Table.RowHeaderCell className="text-gray-500">Fornecimento Circulante</Table.RowHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              [1,2,3,4,5,6,7].map(row => (
              <Table.Row>
                <Table.RowHeaderCell><Star color="gray" size={20} /></Table.RowHeaderCell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell className="flex items-center gap-2 text-base">
                  <div>
                    <Image 
                      src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                      alt="bitcoin logo"
                      width={26}
                      height={26}  
                    /> 
                  </div>
                  Bitcoin
                  <Text className="text-gray-500 text-sm" as="span">BTC</Text>
                </Table.Cell>
                <Table.Cell>$ 27,556.28</Table.Cell>
                <Table.Cell>+13,25%</Table.Cell>
                <Table.Cell>$ 568.8M</Table.Cell>
                <Table.Cell>19,898,965 BTC</Table.Cell>
              </Table.Row>
              ))
            }
          </Table.Body>
        </Table.Root>
      </ScrollArea>
    </section>
  )
}