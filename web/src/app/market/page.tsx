interface MarketProps {
  searchParams: {
    page: string
  }
}

export default function Market({ searchParams }: MarketProps) {
  console.log(searchParams)
  return <h1>hello from Market {searchParams.page}</h1>
}
