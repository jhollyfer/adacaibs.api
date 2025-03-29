/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import '#routes/authentication.route'
import '#routes/user.route'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
