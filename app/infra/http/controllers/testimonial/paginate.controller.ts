import TestimonialPaginateUseCase from '#domain/testimonial/use-case/paginate.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialPaginateController {
  constructor(private readonly useCase: TestimonialPaginateUseCase) {}

  /**
   * @handle
   * @tag Depoimentos
   * @summary Listagem Paginada de Depoimentos
   * @description Endpoint para listar depoimentos com paginação e filtro de busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Itens por página - @type(number) @example(10)
   * @paramQuery search - Termo de busca - @type(string) @example("excelente")
   * @responseBody 200 - {"meta":{"total":100,"currentPage":1,"perPage":10,"lastPage":10},"data":[{"id":"1","name":"João Silva","position":"CEO","rating":"5","testimonial":"Excelente serviço!","photo":"https://exemplo.com/foto.jpg","status":"PUBLISHED","createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-01T00:00:00.000Z"}]}
   * @responseBody 401 - {"message":"Não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = TestimonialValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
