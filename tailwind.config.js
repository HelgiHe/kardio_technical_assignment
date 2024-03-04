/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sand-100': '#111110',
        'sand-500': '#3B3A37',
        'sand-700': '#222221',
        'sand-800': '#B5B3AD',
        'sand-900': '#EEEEEC',
      },
    },
  },
  plugins: [],
}

