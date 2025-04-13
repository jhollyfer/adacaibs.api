import EventsPaginateUseCase from '#domain/event/use-cases/paginate.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventsPaginateController {
  constructor(private readonly useCase: EventsPaginateUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Lista Paginada de Eventos
   * @description Lista Paginada de Eventos
   * @paramQuery page - Page number - @type(number)
   * @paramQuery perPage - Number of records per page - @type(number)
   * @paramQuery search - Search term - @type(string)
   * @responseBody 200 - <Event[]>.paginated()
   * @responseBody 401 - {"message": "Not authorized"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = EventValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })

    return context.response.ok(result.value)
  }
}
