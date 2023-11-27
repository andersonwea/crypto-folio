import { Header } from '@/components/Header'
import { Wallet } from './components/Wallet'
import { getWalletCurrencies } from '@/actions/currencies/getWalletCurrencies'

export default async function WalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { walletCurrencies } = await getWalletCurrencies()

  return (
    <div>
      <Header title="Portfolio" />

      <main className="grid grid-cols-[0.6fr_minmax(0,_1fr)] max-md:grid-cols-1">
        <section className="col-span-2 max-md:col-span-1">
          {walletCurrencies && <Wallet walletCurrencies={walletCurrencies} />}
        </section>

        {children}
      </main>
    </div>
  )
}
