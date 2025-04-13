import UserDeleteUserCase from '#domain/user/use-cases/delete.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserDeleteController {
  constructor(private readonly useCase: UserDeleteUserCase) {}
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
