/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const EventCreateController = () => import('#infra/http/controllers/events/create.controller')

router
  .group(() => {
    router.post('/', [EventCreateController]).as('events.create')
    // router.patch('/:id', [NewsUpdateController]).as('news.update')
    // router.delete('/:id', [NewsRemoveController]).as('news.delete')
    // router.get('/paginate', [NewsPaginateController]).as('news.paginate')
  })
  .middleware(middleware.auth())
  .prefix('events')
