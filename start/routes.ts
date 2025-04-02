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
import '#infra/http/routes/user.route'

router.get('/', async () => {
  return {
    message: 'Bem vindo ao Adacaibs API',
  }
})
