module.exports = {
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["unused-imports", "simple-import-sort", "prettier"],
  "rules": {
    "semi": ["error", "never"],
    "eol-last": ["error", "always"],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "simple-import-sort/imports": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "prettier/prettier": "error"
  }
}