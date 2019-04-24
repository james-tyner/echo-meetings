module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    "airbnb-base"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "camelcase": [
      "off"
    ],
    "no-restricted-syntax": [
      "off"
    ],
    "no-plusplus": [
      "off"
    ],
    "no-continue": [
      "off"
    ],
    "no-unused-vars": [
      "warn"
    ],
    "no-use-before-define": [
      "warn"
    ],
    "no-restricted-globals": [
      "off"
    ],
    "max-len": [
      "off"
    ],
    "no-underscore-dangle": [
      "off"
    ],
    "no-param-reassign": [
      "off"
    ],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
