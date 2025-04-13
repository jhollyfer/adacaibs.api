/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const EventPaginateController = () => import('#infra/http/controllers/event/paginate.controller')
const EventDeleteController = () => import('#infra/http/controllers/event/delete.controller')
const EventUpdateController = () => import('#infra/http/controllers/event/update.controller')
const EventCreateController = () => import('#infra/http/controllers/event/create.controller')

router
  .group(() => {
    router.post('/', [EventCreateController]).as('event.create')
    router.patch('/:id', [EventUpdateController]).as('event.update')
    router.delete('/:id', [EventDeleteController]).as('event.delete')
    router.get('/paginate', [EventPaginateController]).as('event.paginate')
  })
  .middleware(middleware.auth())
  .prefix('event')
