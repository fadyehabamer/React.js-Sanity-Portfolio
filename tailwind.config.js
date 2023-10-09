/** @type {import('tailwindcss').Config} */

export default {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
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
  variants: {
    extend: {},
  },
  plugins: [],
};
