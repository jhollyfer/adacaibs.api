import { configApp } from '@adonisjs/eslint-config'

export default configApp({
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
  },
})

// import { configApp } from '@adonisjs/eslint-config'

// export default configApp({
//   rules: {
//     '@typescript-eslint/explicit-function-return-type': [
//       'error',
//       {
//         allowTypedFunctionExpressions: true,
//       },
//     ],
//   },
//   // Adicione overrides para ignorar pastas específicas
//   overrides: [
//     {
//       // Especifique os padrões de arquivos que você quer ignorar
//       // Por exemplo, para ignorar todos os arquivos em 'tests' e 'mocks'
//       files: ['**/tests/**/*.ts', '**/mocks/**/*.ts'],
//       rules: {
//         // Desative a regra para esses arquivos
//         '@typescript-eslint/explicit-function-return-type': 'off',
//       },
//     },
//   ],
// })
