import { Heading, Text } from "@radix-ui/themes";
import { Star } from "lucide-react";
import Image from "next/image";

export function Market() {
  return (
    <section className="mt-7 sm:col-span-2 pt-7">
      <Heading>Mercado</Heading>

      <div className="overflow-auto max-w-full">
        <table className="pt-7 w-full border-collapse">
          <thead>
            <tr className="space-x-10">
              <th></th>
              <th className="text-gray-500 sticky">#</th>
              <th className="text-gray-500 sticky left-0 shadow-sm">Nome</th>
              <th className="text-gray-500">Preço</th>
              <th className="text-gray-500">Valorização</th>
              <th className="text-gray-500">Cap. de Mercado</th>
              <th className="text-gray-500">Fornecimento Circulante</th>
            </tr>
          </thead>

          <tbody>
            {
              [1,2,3,4,5,6,7].map(row => (
              <tr>
                <td><Star color="gray" size={20} /></td>
                <td>1</td>
                <td className="flex items-center gap-2 text-base sticky left-0 shadow-sm">
                  <div className="w-7 h-7">
                    <Image 
                      src="https://img.api.cryptorank.io/coins/60x60.bitcoin1524754012028.png"
                      alt="bitcoin logo"
                      width={26}
                      height={26}  
                    /> 
                  </div>
                  Bitcoin
                  <Text className="text-gray-500 text-sm" as="span">BTC</Text>
                </td>
                <td>$ 27,556.28</td>
                <td>+13,25%</td>
                <td>$ 568.8M</td>
                <td>19,898,965 BTC</td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}