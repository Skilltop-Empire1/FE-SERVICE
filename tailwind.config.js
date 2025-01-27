/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ['./src/**/*.{html,js}'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        serviceBlue: '#2563EB',
        serviceRed: '#F44336',
        imsDarkPurple: '#4A02A3',
      },
    },
  },
  plugins: [],
}
