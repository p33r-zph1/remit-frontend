/** @type {import("prettier").Options} */
const config = {
  arrowParens: 'avoid',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

module.exports = config;
