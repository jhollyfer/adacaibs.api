/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import '#infra/http/routes/authentication.route'
import '#infra/http/routes/event.route'
import '#infra/http/routes/news.route'
import '#infra/http/routes/podcast.route'
import '#infra/http/routes/testimonial.route'
import '#infra/http/routes/video.route'
import '#infra/http/routes/user.route'

import swagger from '#config/swagger'
import AutoSwagger from 'adonis-autoswagger'
// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/documentation', async () => {
  // return AutoSwagger.default.ui('/swagger', swagger)
  // to use Scalar instead. If you want, you can pass proxy url as second argument here.
  return AutoSwagger.default.scalar('/swagger')
  // to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
  // return AutoSwagger.default.rapidoc('/swagger', 'view')
})

router.get('/', async () => {
  return {
    message: 'Bem vindo ao Adacaibs API',
  }
})
