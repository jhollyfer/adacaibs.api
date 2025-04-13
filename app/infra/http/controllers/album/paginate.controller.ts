import AlbumPaginateUseCase from '#domain/album/use-cases/paginate.use-case'
import { AlbumValidator } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumPaginateController {
  constructor(private readonly useCase: AlbumPaginateUseCase) {}

  /**
   * @handle
   * @tag Albums
   * @summary Lista de Albums Paginada
   * @description Lista de Albums Paginada
   * @paramQuery page - Número da página - @type(number)
   * @paramQuery perPage - Quantidade de registros por página - @type(number)
   * @paramQuery search - Termo de busca - @type(string)
   * @responseBody 200 - <Album[]>.paginated()
   * @responseBody 401 - {"message": "Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = AlbumValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
