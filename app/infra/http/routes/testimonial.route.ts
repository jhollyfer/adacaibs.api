/* eslint-disable @typescript-eslint/explicit-function-return-type */
const TestimonialCreateController = () =>
  import('#infra/http/controllers/testimonial/create.controller')
const TestimonialDeleteController = () =>
  import('#infra/http/controllers/testimonial/delete.controller')
const TestimonialUpdateController = () =>
  import('#infra/http/controllers/testimonial/update.controller')
const TestimonialPaginateController = () =>
  import('#infra/http/controllers/testimonial/paginate.controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [TestimonialCreateController]).as('testimonial.create')
    router.patch('/:id', [TestimonialUpdateController]).as('testimonial.update')
    router.delete('/:id', [TestimonialDeleteController]).as('testimonial.delete')
    router.get('/paginate', [TestimonialPaginateController]).as('testimonial.paginate')
  })
  .middleware(middleware.auth())
  .prefix('testimonial')
