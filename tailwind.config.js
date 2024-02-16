import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';
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
        'deep-blue': '#2F80ED',
        'regal-blue': 'rgba(94,132,184,0.78)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    /** @see https://daisyui.com/docs/themes/#-7 */
    themes: [
      {
        winter: {
          ...themes.winter,
          primary: '#1165EF',
          accent: '#de8800',
          success: '#009747',
          error: '#cf3452',
        },
      },
    ],
  },
};
