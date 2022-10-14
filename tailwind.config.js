/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './icons/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      // Dark
      deepBlue: colors.blue[900],
      slate900: colors.slate[900],
      neutral900: colors.neutral[900],
      deepIndigo: colors.indigo[900],
      zinc900: colors.zinc[900],
      // Light
      lightTeal: colors.teal[400],
      red: colors.red[700],
      // Colorful
      white: colors.slate[50],
      orange: colors.orange[600],
    },
  },
  plugins: [],
  darkMode: 'class',
};
