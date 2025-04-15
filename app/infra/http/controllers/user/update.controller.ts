import UserUpdateUseCase from '#domain/user/use-cases/update.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserUpdateController {
  constructor(private readonly useCase: UserUpdateUseCase) {}

  /**
   * @handle
   * @tag Usuários
   * @summary Atualizar Usuário
   * @description Endpoint para atualizar os dados de um usuário existente
   * @paramPath id - ID único do usuário - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @requestBody {"name":"João Silva Atualizado","email":"novo.email@exemplo.com","role":"USER","avatar":"https://exemplo.com/novo-avatar.jpg"}
   * @responseBody 200 - {"id":"550e8400-e29b-41d4-a716-446655440000","name":"João Silva Atualizado","email":"novo.email@exemplo.com","role":"USER","avatar":"https://exemplo.com/novo-avatar.jpg","createdAt":"2024-05-20T10:00:00.000Z","updatedAt":"2024-05-25T15:30:00.000Z"}
   * @responseBody 404 - {"message":"Usuário não encontrado"}
   * @responseBody 500 - {"message":"Erro ao atualizar usuário"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = UserValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Usuário não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
