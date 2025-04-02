/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AuthenticationSendLinkController = () =>
  import('#infra/http/controllers/authentication/send-link.controller')

const AuthenticationValidateLinkController = () =>
  import('#infra/http/controllers/authentication/validate-link.controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/send-link', [AuthenticationSendLinkController]).as('authentication.send-link')
    router
      .get('/validate-link', [AuthenticationValidateLinkController])
      .as('authentication.validate-link')
  })
  .prefix('authentication')
