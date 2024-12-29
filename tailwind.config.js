/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'md': '992px',
      // => @media (min-width: 960px) { ... }
    },
  },
  plugins: [],
}


