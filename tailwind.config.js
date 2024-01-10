import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /** @see https://tailwindcss.com/docs/font-family#customizing-the-default-font */
        'sans': ['"Inter"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [forms, daisyui],
  daisyui: {
    themes: ['winter'],
  },
}