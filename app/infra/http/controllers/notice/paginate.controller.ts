import NoticePaginateUseCase from '#domain/notice/use-cases/paginate.use-case'
import { NoticeValidator } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NoticePaginateController {
  constructor(private readonly useCase: NoticePaginateUseCase) {}

  /**
   * @handle
   * @tag Noticias
   * @summary Lista de Noticias Paginada
   * @description Lista de Noticias Paginada
   * @paramQuery page - Número da página - @type(number)
   * @paramQuery perPage - Quantidade de registros por página - @type(number)
   * @paramQuery search - Termo de busca - @type(string)
   * @responseBody 200 - <Notice[]>.paginated()
   * @responseBody 401 - {"message": "Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = NoticeValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })

    return context.response.ok(result.value)
  }
}
