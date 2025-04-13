/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const EventCreateController = () => import('#infra/http/controllers/events/create.controller')
const EventUpdateController = () => import('#infra/http/controllers/events/update.controller')
const EventDeleteController = () => import('#infra/http/controllers/events/delete.controller')
const EventPaginateController = () => import('#infra/http/controllers/events/paginate.controller')

router
  .group(() => {
    router.post('/', [EventCreateController]).as('events.create')
    router.patch('/:id', [EventUpdateController]).as('events.update')
    router.delete('/:id', [EventDeleteController]).as('events.delete')
    router.get('/paginate', [EventPaginateController]).as('events.paginate')
  })
  .middleware(middleware.auth())
  .prefix('events')
