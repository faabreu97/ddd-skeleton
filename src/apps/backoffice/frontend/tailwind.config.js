/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import formsPlugin from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: {
          light: '#15ffb2',
          DEFAULT: '#00c383',
          dark: '#006a47',
          50: '#eafff5',
          100: '#cdfee5',
          200: '#a0fad1',
          300: '#63f2b9',
          400: '#25e29e',
          500: '#00c383',
          600: '#00a46f',
          700: '#00835c',
          800: '#00674a',
          900: '#00553e',
          950: '#003024'
        },
        primary: {
          light: '#4a8ece',
          DEFAULT: '#132d46',
          dark: '#10273c',
          50: '#f2f8fd',
          100: '#e4effa',
          200: '#c4dff3',
          300: '#8fc5ea',
          400: '#53a6dd',
          500: '#2d8bca',
          600: '#1e6eab',
          700: '#1a588a',
          800: '#194c73',
          900: '#1a4060',
          950: '#132d46'
        },
        surface: {
          DEFAULT: colors.slate[100],
          dark: colors.slate[700]
        }
      }
    }
  },
  plugins: [formsPlugin]
};
