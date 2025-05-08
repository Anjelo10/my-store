module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // Longgarkan aturan untuk pengembangan awal
    "@typescript-eslint/no-unused-vars": "warn", // variabel tidak terpakai = peringatan
    "@typescript-eslint/no-explicit-any": "warn", // izinkan penggunaan any
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "react/react-in-jsx-scope": "off", // tidak wajib import React di JSX (Next.js)
    "react/prop-types": "off", // tidak pakai prop-types di TS
    "no-console": "off", // izinkan console.log saat dev
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
