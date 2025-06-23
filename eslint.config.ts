import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'

const config = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    ignores: ['./node_modules', './dist', './tests'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
      ignores: ["dist/**", "node_modules/**", "tests/**"]
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      ignores: ["dist/**", "node_modules/**", "tests/**"]
    }
  }
]

export default config
