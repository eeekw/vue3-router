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
    'arrow-parens': 'off'
  },
  settings: {
    'import/resolver': 'webpack'
  }
}
