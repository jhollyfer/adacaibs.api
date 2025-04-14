import EventPaginateUseCase from '#domain/event/use-cases/paginate.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventPaginateController {
  constructor(private readonly useCase: EventPaginateUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Listagem Paginada de Eventos
   * @description Endpoint para listar eventos com paginação e filtro de busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo para filtragem - @type(string) @example("Workshop")
   * @responseBody 200 - {"meta":{"total":50,"currentPage":1,"perPage":10,"lastPage":5},"data":[{"id":"1","title":"Workshop de TypeScript","date":"2025-05-15","hour":"14:00","location":"Sala de Conferências","address":"Av. Tech, 456","category":"WORKSHOP","capacity":100,"description":"Descrição resumida","detailedContent":"Conteúdo detalhado do evento...","cover":"https://exemplo.com/capa.jpg","createdAt":"2025-05-01T00:00:00.000Z","updatedAt":"2025-05-01T00:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
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
