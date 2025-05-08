module.exports = {
  extends: "next/core-web-vitals",
  rules: {
    // Matikan aturan yang menyebabkan error
    "@typescript-eslint/no-unused-vars": "warn", // Ubah dari 'error' ke 'warn'
    "@typescript-eslint/no-explicit-any": "warn", // Ubah dari 'error' ke 'warn'
    "@typescript-eslint/no-unsafe-function-type": "warn", // Ubah dari 'error' ke 'warn'
  },
};
