module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "no-extra-semi": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".vue", ".ts", ".d.ts"],
      },
      alias: {
        extensions: [".vue", ".js", ".ts", ".scss", ".d.ts"],
        map: [
          ["@/components", "./src/components"],
          ["@/pages", "./src/pages"],
          ["@/router", "./src/router"],
          ["@/store", "./src/store"],
          ["@/styles", "./src/styles"],
          ["@/types", "./src/types"],
          ["@/utils", "./src/utils"],
        ],
      },
    },
  },
}
