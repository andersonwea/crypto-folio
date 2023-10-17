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
        'gray-300': '#F2F5FA',
        'gray-500': '#7A899A',
        'gray-800': '#202020',

        'blue-300': '#BCDFFF',
        'blue-500': '#0587FF',

        'yellow-300': '#F6F0D8',

        'green-300': '#D6EDDA',
        'green-500': '#4BA582',

        'purple-300': '#E5DEF0',
      },

      fontFamily: {
        default: 'var(--font-poppins)',
      },
    },
  },
  plugins: [],
}
export default config
