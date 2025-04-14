import VideoPaginateUseCase from '#domain/video/use-case/paginate.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoPaginateController {
  constructor(private readonly useCase: VideoPaginateUseCase) {}

  /**
   * @handle
   * @tag Vídeos
   * @summary Listagem Paginada de Vídeos
   * @description Endpoint para listar vídeos com paginação e busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo de busca - @type(string) @example("TypeScript")
   * @responseBody 200 - {"meta":{"total":100,"currentPage":1,"perPage":10,"lastPage":10},"data":[{"id":"1","title":"Introdução ao TypeScript","date":"2024-05-20","duration":"01:23:45","instructor":"John Doe","url":"https://exemplo.com/videos/typescript","description":"Tutorial completo","thumbnail":"https://exemplo.com/thumbs/typescript.jpg","createdAt":"2024-05-15T10:00:00.000Z","updatedAt":"2024-05-15T10:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
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
