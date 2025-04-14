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
   * @summary Criar Usuário
   * @description Endpoint para criação de novos usuários no sistema
   * @requestBody {"name":"João Silva","email":"joao.silva@exemplo.com","role":"ADMINISTRATOR","avatar":"https://exemplo.com/avatar.jpg"}
   * @responseBody 201 - {"id":"550e8400-e29b-41d4-a716-446655440000","name":"João Silva","email":"joao.silva@exemplo.com","role":"ADMINISTRATOR","avatar":"https://exemplo.com/avatar.jpg","createdAt":"2024-05-20T10:00:00.000Z","updatedAt":"2024-05-20T10:00:00.000Z"}
   * @responseBody 409 - {"message":"Usuário já cadastrado"}
   * @responseBody 500 - {"message":"Erro interno no servidor"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = UserValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Usuário já cadastrado':
          return context.response.conflict({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.created(result.value)
  }
}
