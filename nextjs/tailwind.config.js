/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090a'
      },

      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
}
