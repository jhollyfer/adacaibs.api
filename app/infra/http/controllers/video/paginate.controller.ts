import VideoPaginateUseCase from '#domain/video/use-case/paginate.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoPaginateController {
  constructor(private readonly useCase: VideoPaginateUseCase) {}

  /**
   * @handle
   * @tag Videos
   * @summary Lista de Videos Paginada
   * @description Lista de Videos Paginada
   * @paramQuery page - Número da página - @type(number)
   * @paramQuery perPage - Quantidade de registros por página - @type(number)
   * @paramQuery search - Termo de busca - @type(string)
   * @responseBody 200 - <Video[]>.paginated()
   * @responseBody 401 - {"message": "Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = VideoValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
