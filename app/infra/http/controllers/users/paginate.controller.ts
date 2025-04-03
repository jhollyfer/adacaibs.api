import UserPaginateUseCase from '#domain/user/application/use-cases/paginate.use-case'
import { UserValidator } from '#infra/http/validators/user.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UserPaginateController {
  constructor(private readonly useCase: UserPaginateUseCase) {}

  async handle(context: HttpContext): Promise<void> {
    const { query } = UserValidator.paginate
    const payload = await query.validate(context.request.qs())
    const result = await this.useCase.execute(payload)
    return context.response.ok(result.value)
  }
}
