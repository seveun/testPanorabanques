module.exports = {
  extends: "airbnb-base",
  parser: "babel-eslint",
  parserOptions: { "ecmaVersion": 7 },
  rules: {
    "object-curly-newline": 0,
    "consistent-return": 0,
    "no-unused-vars": 1,
    "eol-last": 0,
    "arrow-parens": 0,
    "camelcase": 0,
    "max-len": 0,
    "no-underscore-dangle": 0,
    "padded-blocks": ["error", { "classes": "always" }],
    "brace-style": 0,
    "arrow-body-style": 0,
    "no-useless-escape": 0,
    "prefer-destructuring": [1, { "array": false, "object": true }],
    "no-param-reassign": 0,
    "no-await-in-loop": 0,
    "no-plusplus": 0,
    "max-len": [2, 100, 4, {"ignoreUrls": true}],
    "no-nested-ternary": 0,
  },
  globals: {
    "controllers": true,
    "validators": true,
    "services": true,
    "rootpath": true,
  },
};
