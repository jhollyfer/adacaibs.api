import NewsPaginateUseCase from '#domain/news/use-cases/paginate.use-case'
import { NewsValidator } from '#infra/http/validators/news.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NewsPaginateController {
  constructor(private readonly useCase: NewsPaginateUseCase) {}

  /**
   * @handle
   * @tag Noticias
   * @summary Lista de Noticias Paginada
   * @description Lista de Noticias Paginada
   * @paramQuery page - Número da página - @type(number)
   * @paramQuery perPage - Quantidade de registros por página - @type(number)
   * @paramQuery search - Termo de busca - @type(string)
   * @responseBody 200 - <News[]>.paginated()
   * @responseBody 401 - {"message": "Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = NewsValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })

    return context.response.ok(result.value)
  }
}
