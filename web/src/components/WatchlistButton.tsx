'use client'

import { MarketCurrency } from '@/@types'
import { toggleWatchlist } from '@/actions/watchlist/toggleWatchlist'
import { Star } from 'lucide-react'
import { experimental_useOptimistic as useOptimistic } from 'react'

interface WatchlistButtonProps {
  marketCurrency: MarketCurrency
  watchlist: MarketCurrency[]
}

export function WatchlistButton({
  marketCurrency,
  watchlist,
}: WatchlistButtonProps) {
  const [optimisticWatchlist, addOptimisticWatchlist] = useOptimistic(
    watchlist,
    (state, newWatchlist: MarketCurrency) => {
      if (state.find((watchlist) => watchlist.id === newWatchlist.id)) {
        return state.filter((watchlist) => watchlist.id !== newWatchlist.id)
      }

      return [...state, newWatchlist]
    },
  )

  async function handleToggleWatchlist(marketCurrency: MarketCurrency) {
    addOptimisticWatchlist(marketCurrency)

    await toggleWatchlist(marketCurrency.id)
  }

  const isWatchlisted = !!optimisticWatchlist?.find(
    (watchlist) => watchlist.id === marketCurrency.id,
  )

  return (
    <Star
      onClick={() => handleToggleWatchlist(marketCurrency)}
      data-watchlist={isWatchlisted}
      size={20}
      className="data-[watchlist=true]:fill-blue-500 cursor-pointer"
      stroke={isWatchlisted ? '#0587FF' : 'gray'}
    />
  )
}
