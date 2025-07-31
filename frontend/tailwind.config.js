/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1A237E',
        secondary: '#ECEFF1',
        accent: '#FF7043',
        text: '#37474F',
        background: '#FAFAFA',
        hover: '#C5CAE9',
        dark: {
          background: '#263238',
          text: '#CFD8DC',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}