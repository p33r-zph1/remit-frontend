import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        /** @see https://tailwindcss.com/docs/font-family#customizing-the-default-font */
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'sleep-100': '#9CA3AF',
        'sleep-200': '#757F87',
      },
    },
  },
  plugins: [forms, daisyui],
  daisyui: {
    /** @see https://daisyui.com/docs/themes/#-7 */
    themes: [
      {
        winter: {
          ...require('daisyui/src/theming/themes')['winter'],
          primary: '#1165EF',
          accent: '#de8800',
          success: '#009747',
          error: '#cf3452',
        },
      },
    ],
  },
};
