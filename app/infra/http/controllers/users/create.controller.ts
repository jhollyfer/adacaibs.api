import UserCreateUseCase from '#domain/user/application/use-cases/create.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserCreateController {
  constructor(private readonly useCase: UserCreateUseCase) {}

  async handle(context: HttpContext): Promise<void> {
    const { body } = UserValidator.create
    const payload = await body.validate(context.request.body())
    const result = await this.useCase.execute(payload)
    return context.response.created(result.value)
  }
}
