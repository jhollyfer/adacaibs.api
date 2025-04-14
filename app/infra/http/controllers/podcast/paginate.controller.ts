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
   * @summary Listagem Paginada de Podcasts
   * @description Endpoint para listar podcasts com paginação e busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo de busca - @type(string) @example("tecnologia")
   * @responseBody 200 - {"meta":{"total":50,"currentPage":1,"perPage":10,"lastPage":5},"data":[{"id":"1","title":"Tendências Tech","date":"2024-05-15","duration":"01:00:00","presenters":["Ana Silva"],"guests":["Carlos Oliveira"],"description":"Discussão sobre inovações","cover":"https://exemplo.com/capa.jpg","content":"Conteúdo completo","createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-01T00:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
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
