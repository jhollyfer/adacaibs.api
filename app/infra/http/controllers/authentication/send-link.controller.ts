import { AuthenticationValidator } from '#infra/http/validators/authentication.validator'
import AuthenticationSendLinkUseCase from '#use-cases/authentication/send-link.use-case'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticationSendLinkController {
  constructor(private readonly useCase: AuthenticationSendLinkUseCase) {}

  async handle(context: HttpContext): Promise<void> {
    console.log('send-link AAAAAAAAAAAAAAAA')
    const { body } = AuthenticationValidator['send-link']
    const payload = await body.validate(context.request.body())
    await this.useCase.execute(payload)
    return context.response.noContent()
  }
}
