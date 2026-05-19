import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fffff0',
        ink: '#1a1a1a',
      },
      boxShadow: {
        brutal: '4px 4px 0px #1a1a1a',
        'brutal-lg': '8px 8px 0px #1a1a1a',
      },
      fontFamily: {
        mono: ['Courier Prime', 'monospace'],
        display: ['Bebas Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config