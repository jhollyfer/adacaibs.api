/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NoticeCreateController = () => import('#infra/http/controllers/notice/create.controller')
const NoticePaginateController = () => import('#infra/http/controllers/notice/paginate.controller')
const NoticeUpdateController = () => import('#infra/http/controllers/notice/update.controller')
const NoticeDeleteController = () => import('#infra/http/controllers/notice/delete.controller')

router
  .group(() => {
    router.post('/', [NoticeCreateController]).as('notice.create')
    router.patch('/:id', [NoticeUpdateController]).as('notice.update')
    router.delete('/:id', [NoticeDeleteController]).as('notice.delete')
    router.get('/paginate', [NoticePaginateController]).as('notice.paginate')
  })
  .middleware(middleware.auth())
  .prefix('notice')
