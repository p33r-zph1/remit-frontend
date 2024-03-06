module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended', // Rule of hooks
    'plugin:@tanstack/eslint-plugin-query/recommended', // React query
    'plugin:react/jsx-runtime', // Runtime prefers to be at the last
    'prettier', // Prettier must be last
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
    /** @see https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#typescript */
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'react',
    'react-refresh',
    'prettier',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    /**
     * @description Warn for unused vars
     * @see https://typescript-eslint.io/rules/no-unused-vars/#how-to-use
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
      },
    ],

    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    'no-param-reassign': 'error',
    'prettier/prettier': 'error',
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'prettier.config.cjs',
    'tailwind.config.js',
    'postcss.config.js',
    'vite.config.ts',
    'routeTree.gen.ts',
  ],
};
