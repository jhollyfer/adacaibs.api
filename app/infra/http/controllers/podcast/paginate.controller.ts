import PodcastPaginateUseCase from '#domain/podcast/use-cases/paginate.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PodcastPaginateController {
  constructor(private readonly useCase: PodcastPaginateUseCase) {}

  /**
   * @handle
   * @tag Podcasts
   * @summary Lista de Podcast Paginada
   * @description Lista de Podcast Paginada
   * @paramQuery page - Número da página - @type(number)
   * @paramQuery perPage - Quantidade de registros por página - @type(number)
   * @paramQuery search - Termo de busca - @type(string)
   * @responseBody 200 - <User[]>.paginated()
   * @responseBody 401 - {"message": "Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
