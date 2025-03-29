import AuthenticationValidateLinkUseCase from '#use-cases/authentication/validate-link.use-case'
import { AuthenticationValidator } from '#validators/authentication.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthenticationValidateLinkController {
  constructor(private readonly useCase: AuthenticationValidateLinkUseCase) {}

  async handle(context: HttpContext): Promise<void> {
    const { query } = AuthenticationValidator['validate-link']
    const payload = await query.validate(context.request.qs())
    const { redirect, token } = await this.useCase.execute(payload)
    console.log({ redirect, token })
    return context.response.cookie('authentication', token).redirect(redirect)
    // return context.response.cookie('authentication', token).send({})
  }
}
