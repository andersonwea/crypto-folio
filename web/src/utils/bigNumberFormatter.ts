const suffixes: { [key: string]: string } = {
  '1e9': 'B',
  '1e6': 'M',
  '1e3': 'K',
}

export function bigNumberFormatter(value: number) {
  for (const suffix in suffixes) {
    if (value >= Number(suffix)) {
      return (value / Number(suffix)).toFixed(2) + suffixes[suffix]
    }
  }

  return value.toFixed(2)
}
