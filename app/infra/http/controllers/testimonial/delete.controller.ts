import TestimonialDeleteUserCase from '#domain/testimonial/use-case/delete.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialDeleteController {
  constructor(private readonly useCase: TestimonialDeleteUserCase) {}

  // /**
  //  * @handle
  //  * @tag Depoimentos
  //  * @summary Remoção de Depoimento
  //  * @description Remove um depoimento específico pelo ID
  //  * @paramPath id - ID do depoimento a ser removido - @type(string)
  //  * @responseBody 204 - Sem conteúdo
  //  * @responseBody 404 - {"message": "Depoimento não encontrado"}
  //  * @responseBody 500 - {"message": "Mensagem de erro interno"}
  //  */
  async handle(context: HttpContext): Promise<void> {
    const validator = TestimonialValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Depoimento não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
