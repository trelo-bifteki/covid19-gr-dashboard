module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'array-bracket-spacing': 1,
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'max-len': [
      'error',
      {
        'code': 120
      }
    ],
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'object-shorthand': [
      'error',
      'always'
    ],
    'object-curly-newline': [
      'error',
      'always',
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'prefer-arrow-callback': [
      'error'
    ],
    quotes: [
      'error',
      'single'
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
