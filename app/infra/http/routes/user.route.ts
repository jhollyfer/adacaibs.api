/* eslint-disable @typescript-eslint/explicit-function-return-type */
const UserCreateController = () => import('#infra/http/controllers/users/create.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const UserDeleteController = () => import('#infra/http/controllers/users/delete.controller')
const UserUpdateController = () => import('#infra/http/controllers/users/update.controller')
const UserPaginateController = () => import('#infra/http/controllers/users/paginate.controller')

router
  .group(() => {
    router.post('/', [UserCreateController]).as('user.create')
    router.patch('/:id', [UserUpdateController]).as('user.update')
    router.delete('/:id', [UserDeleteController]).as('user.delete')
    router.get('/paginate', [UserPaginateController]).as('user.paginate')
  })
  .middleware(middleware.auth())
  .prefix('user')
