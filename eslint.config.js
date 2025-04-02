import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    '@unicorn/filename-case': ['off'],
  },
})
