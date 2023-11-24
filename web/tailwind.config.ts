import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
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
      boxShadow: {
        '3xl': '0 8px 40px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [nextui()],
}
export default config
