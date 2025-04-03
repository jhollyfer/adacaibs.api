import UserCreateUseCase from '#domain/user/use-cases/create.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserCreateController {
  constructor(private readonly useCase: UserCreateUseCase) {}

  /**
   * @handle
   * @tag Usuários
   * @summary Criação de Usuário
   * @description Criação de Usuário
   * @requestBody {"email": "example@adacaibs.com", "name": "John Doe", "role": "ADMINISTRATOR"}
   * @responseBody 201 - <User>
   */

  async handle(context: HttpContext): Promise<void> {
    const { body } = UserValidator.create
    const payload = await body.validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      console.error(error.message)
      switch (error.message) {
        case 'Usuário já cadastrado':
          return context.response.badRequest({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.created(result.value)
  }
}
