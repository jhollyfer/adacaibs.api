import UserDeleteUseCase from '#domain/user/use-cases/delete.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserDeleteController {
  constructor(private readonly useCase: UserDeleteUseCase) {}

  /**
   * @handle
   * @tag Usuários
   * @summary Excluir Usuário
   * @description Endpoint para remover permanentemente um usuário do sistema
   * @paramPath id - ID único do usuário - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @response 204 - Usuário excluído com sucesso (sem conteúdo)
   * @responseBody 404 - {"message": "Usuário não encontrado"}
   * @responseBody 500 - {"message": "Erro interno ao excluir usuário"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = UserValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Usuário não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
