/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#00A2FF',
        secondary: '#FF00FF',
        tertiary: '#FFA200',
        dark: '#1F1F1F',
        light: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
