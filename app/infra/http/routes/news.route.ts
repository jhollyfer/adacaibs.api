/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NewsCreateController = () => import('#infra/http/controllers/news/create.controller')
const NewsPaginateController = () => import('#infra/http/controllers/news/paginate.controller')
const NewsUpdateController = () => import('#infra/http/controllers/news/update.controller')
const NewsRemoveController = () => import('#infra/http/controllers/news/remove.controller')

router
  .group(() => {
    router.post('/', [NewsCreateController]).as('news.create')
    router.patch('/:id', [NewsUpdateController]).as('news.update')
    router.delete('/:id', [NewsRemoveController]).as('news.delete')
    router.get('/paginate', [NewsPaginateController]).as('news.paginate')
  })
  .middleware(middleware.auth())
  .prefix('news')
