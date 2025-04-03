import UserSignInUseCase from '#domain/user/application/use-cases/sign-in.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserSignInController {
  constructor(private readonly useCase: UserSignInUseCase) {}

  /**
   * @handle
   * @summary Autenticação de Usuário
   * @description Autenticação de Usuário
   * @responseBody 201 - {"token": "xxxxxxx"}
   * @requestBody {"email": "example@adacaibs.com", "password": "123123123"}
   */
  async handle(context: HttpContext): Promise<void> {
    const { body } = UserValidator['sign-in']
    const payload = await body.validate(context.request.body())
    const result = await this.useCase.execute(payload)
    return context.response.created(result.value)
  }
}
