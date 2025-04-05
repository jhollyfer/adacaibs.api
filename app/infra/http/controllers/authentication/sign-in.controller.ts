import UserSignInUseCase from '#domain/user/use-cases/sign-in.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserSignInController {
  constructor(private readonly useCase: UserSignInUseCase) {}

  /**
   * @handle
   * @tag Autenticação
   * @summary Autenticação de Usuário
   * @description Autenticação de Usuário
   * @requestBody {"email": "example@adacaibs.com", "password": "123123123"}
   * @responseBody 201 - {"token": "xxxxxxx"}
   * @responseBody 401 - {"message": "Credencial inválida"}
   * @responseBody 500 - {"message": "Erro ao gerar token"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = UserValidator['sign-in']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value

      switch (error.message) {
        case 'Credencial inválida':
          return context.response.unauthorized({ message: error.message })
        case 'Erro ao gerar token':
          return context.response.internalServerError({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.created(result.value)
  }
}
