/* eslint-disable @typescript-eslint/explicit-function-return-type */
const VideoCreateController = () => import('#infra/http/controllers/video/create.controller')
const VideoDeleteController = () => import('#infra/http/controllers/video/delete.controller')
const VideoUpdateController = () => import('#infra/http/controllers/video/update.controller')
const VideoPaginateController = () => import('#infra/http/controllers/video/paginate.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [VideoCreateController]).as('video.create')
    router.patch('/:id', [VideoUpdateController]).as('video.update')
    router.delete('/:id', [VideoDeleteController]).as('video.delete')
    router.get('/paginate', [VideoPaginateController]).as('video.paginate')
  })
  .middleware(middleware.auth())
  .prefix('video')
