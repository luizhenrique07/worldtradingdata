module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true
  },
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    semi: ["error", "always"],
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "space-before-function-paren": ["error", "never"],
    quotes: [2, "double", { avoidEscape: true }],
    "no-use-before-define": ["error", "nofunc"]
  }
};
