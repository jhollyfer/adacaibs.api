/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const EventsPaginateController = () => import('#infra/http/controllers/event/paginate.controller')
const EventsDeleteController = () => import('#infra/http/controllers/event/delete.controller')
const EventsUpdateController = () => import('#infra/http/controllers/event/update.controller')
const EventCreateController = () => import('#infra/http/controllers/event/create.controller')

router
  .group(() => {
    router.post('/', [EventCreateController]).as('events.create')
    router.patch('/:id', [EventsUpdateController]).as('events.update')
    router.delete('/:id', [EventsDeleteController]).as('events.delete')
    router.get('/paginate', [EventsPaginateController]).as('events.paginate')
  })
  .middleware(middleware.auth())
  .prefix('events')
