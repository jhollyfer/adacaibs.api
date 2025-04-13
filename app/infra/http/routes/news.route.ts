/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NewsCreateController = () => import('#infra/http/controllers/new/create.controller')
const NewsPaginateController = () => import('#infra/http/controllers/new/paginate.controller')
const NewsUpdateController = () => import('#infra/http/controllers/new/update.controller')
const NewsDeleteController = () => import('#infra/http/controllers/new/delete.controller')

router
  .group(() => {
    router.post('/', [NewsCreateController]).as('news.create')
    router.patch('/:id', [NewsUpdateController]).as('news.update')
    router.delete('/:id', [NewsDeleteController]).as('news.delete')
    router.get('/paginate', [NewsPaginateController]).as('news.paginate')
  })
  .middleware(middleware.auth())
  .prefix('news')
