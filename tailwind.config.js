import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';

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
      backgroundImage: {
        'card-gradient':
          'linear-gradient(180.11deg, #2F80ED 1.73%, rgba(94, 132, 184, 0.78) 99.9%)',
      },
    },
  },
  plugins: [daisyui],
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
