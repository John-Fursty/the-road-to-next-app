import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  // Добавьте эту секцию для simple-import-sort
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          "groups": [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]]
        }
      ],
      "simple-import-sort/exports": "error"
    },
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    }
  },
  
  // Ваши ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
