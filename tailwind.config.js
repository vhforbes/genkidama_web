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
      // white: colors.slate[50],
      orange: colors.orange[600],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=aqua]'],
          primary: '#bae6fd',
          secondary: '#2dd4bf',
          accent: '#f97316',
          neutral: colors.slate[900],
          'base-100': '#f8fafc',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#facc15',
          error: '#f87171',
        },
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#0f172a',
          secondary: '#164e63',
          accent: '#c2410c',
          neutral: colors.slate[100],
          'base-100': '#1f2937',
          info: '#1e3a8a',
          success: '#047857',
          warning: '#d97706',
          error: '#b91c1c',
        },
      },
    ],
  },
  darkMode: 'class',
};
