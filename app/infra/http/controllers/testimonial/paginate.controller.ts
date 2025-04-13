import TestimonialPaginateUseCase from '#domain/testimonial/use-case/paginate.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialPaginateController {
  constructor(private readonly useCase: TestimonialPaginateUseCase) {}

  // /**
  //  * @handle
  //  * @tag Depoimentos
  //  * @summary Lista de Depoimentos Paginada
  //  * @description Lista de Depoimentos Paginada
  //  * @paramQuery page - Número da página - @type(number)
  //  * @paramQuery perPage - Quantidade de registros por página - @type(number)
  //  * @paramQuery search - Termo de busca - @type(string)
  //  * @responseBody 200 - <Testimonial[]>.paginated()
  //  * @responseBody 401 - {"message": "Não autorizado"}
  //  */
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
