/* eslint-disable @typescript-eslint/explicit-function-return-type */
const UserCreateController = () => import('#infra/http/controllers/users/create.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const UserPaginateController = () => import('#infra/http/controllers/users/paginate.controller')

router
  .group(() => {
    router.post('/', [UserCreateController]).as('user.create')
    router.get('/paginate', [UserPaginateController]).as('user.paginate')
  })
  .middleware(middleware.auth())
  .prefix('user')
