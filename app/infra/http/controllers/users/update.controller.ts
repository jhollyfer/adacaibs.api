import UserUpdateUseCase from '#domain/user/use-cases/update.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserUpdateController {
  constructor(private readonly useCase: UserUpdateUseCase) {}

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
