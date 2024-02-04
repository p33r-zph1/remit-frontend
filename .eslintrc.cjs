module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:react/jsx-runtime', // Runtime prefers to be at the last
    'prettier', // Prettier must be last
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'prettier.config.cjs',
    'tailwind.config.js',
    'postcss.config.js',
    'vite.config.ts',
    'routeTree.gen.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'prettier/prettier': 'error',
  },
};
