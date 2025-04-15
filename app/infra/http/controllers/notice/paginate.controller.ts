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
   * @summary Listagem Paginada de Notícias
   * @description Endpoint para listar notícias com paginação e busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo de busca - @type(string) @example("atualizações")
   * @responseBody 200 - {"meta":{"total":100,"currentPage":1,"perPage":10,"lastPage":10},"data":[{"id":"1","title":"Novidades Tecnológicas","category":"TECH","status":"PUBLISHED","resume":"Resumo das últimas atualizações","content":"Conteúdo detalhado...","cover":"https://exemplo.com/capa.jpg","tags":["tech","inovação"],"createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-01T00:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
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
