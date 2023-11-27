'use client'

import { MarketCurrency } from '@/@types'
import { toggleWatchlist } from '@/actions/watchlist/toggleWatchlist'
import { Button } from '@nextui-org/react'
import { Star } from 'lucide-react'
import { experimental_useOptimistic as useOptimistic, useState } from 'react'

interface WatchlistButtonProps {
  marketCurrency: MarketCurrency
  watchlist: MarketCurrency[]
}

export function WatchlistButton({
  marketCurrency,
  watchlist,
}: WatchlistButtonProps) {
  const [isSubmiting, setIsSubmiting] = useState(false)

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
    setIsSubmiting(true)

    addOptimisticWatchlist(marketCurrency)

    await toggleWatchlist(marketCurrency.id)

    setIsSubmiting(false)
  }

  const isWatchlisted = !!optimisticWatchlist?.find(
    (watchlist) => watchlist.id === marketCurrency.id,
  )

  return (
    <Button
      type="button"
      isIconOnly
      variant="light"
      radius="full"
      onClick={() => handleToggleWatchlist(marketCurrency)}
      disabled={isSubmiting}
    >
      <Star
        size={20}
        data-watchlist={isWatchlisted}
        stroke={isWatchlisted ? '#0587FF' : 'gray'}
        className="data-[watchlist=true]:fill-blue-500"
      />
    </Button>
  )
}
