/* eslint-disable @typescript-eslint/explicit-function-return-type */
import router from '@adonisjs/core/services/router'
const UserSignInController = () =>
  import('#infra/http/controllers/authentication/sign-in.controller')

router
  .group(() => {
    router.post('/sign-in', [UserSignInController]).as('authentication.sign-in')
  })
  .prefix('authentication')
