/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AlbumCreateController = () => import('#infra/http/controllers/album/create.controller')
const AlbumDeleteController = () => import('#infra/http/controllers/album/delete.controller')
const AlbumUpdateController = () => import('#infra/http/controllers/album/update.controller')
const AlbumPaginateController = () => import('#infra/http/controllers/album/paginate.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [AlbumCreateController]).as('album.create')
    router.patch('/:id', [AlbumUpdateController]).as('album.update')
    router.delete('/:id', [AlbumDeleteController]).as('album.delete')
    router.get('/paginate', [AlbumPaginateController]).as('album.paginate')
  })
  .middleware(middleware.auth())
  .prefix('album')
