module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended'
  ],

  plugins: ['@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-var-requires': 'off',
    'eol-last': 'off',
    'arrow-parens': 'off',
    'no-use-before-define': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  },
  settings: {
    'import/resolver': 'webpack'
    // 'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off'
      }
    }
  ]
}
