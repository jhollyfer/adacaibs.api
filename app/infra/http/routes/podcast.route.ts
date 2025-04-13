/* eslint-disable @typescript-eslint/explicit-function-return-type */
const PodcastCreateController = () => import('#infra/http/controllers/podcast/create.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PodcastDeleteController = () => import('#infra/http/controllers/podcast/delete.controller')
const PodcastUpdateController = () => import('#infra/http/controllers/podcast/update.controller')
const PodcastPaginateController = () =>
  import('#infra/http/controllers/podcast/paginate.controller')

router
  .group(() => {
    router.post('/', [PodcastCreateController]).as('podcast.create')
    router.patch('/:id', [PodcastUpdateController]).as('podcast.update')
    router.delete('/:id', [PodcastDeleteController]).as('podcast.delete')
    router.get('/paginate', [PodcastPaginateController]).as('podcast.paginate')
  })
  .middleware(middleware.auth())
  .prefix('podcast')
