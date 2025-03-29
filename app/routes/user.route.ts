/* eslint-disable @typescript-eslint/explicit-function-return-type */
const UserCreateController = () => import('#controllers/users/create.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [UserCreateController]).as('user.create')
  })
  .middleware(middleware.auth())
  .prefix('user')
