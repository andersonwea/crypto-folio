import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#202020',
        secondary: '#7A899A',

        'blue-300': '#BCDFFF',
        'blue-500': '#0587FF',

        'yellow-300': '#F6F0D8',

        'green-300': '#D6EDDA',
        'green-500': '#4BA582',

        'purple-300': '#E5DEF0',
      },
    },
  },
  plugins: [],
}
export default config
