module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: [
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'eslint-plugin-import'
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:import/recommended',
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },

  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/no-explicit-any': 0,
    'newline-before-return': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'import-helpers/order-imports': [
      2,
      {
        newlinesBetween: 'always',
        groups: [
          ['/^next/', 'module'],
          '/^@/styles/',
          '/^@/lib/',
          '/^@/components/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true
        }
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_'
      }
    ],
    'no-console': [
      2,
      {
        allow: ['warn', 'error']
      }
    ]
  }
};
