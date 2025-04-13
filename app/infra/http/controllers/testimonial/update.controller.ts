import TestimonialUpdateUseCase from '#domain/testimonial/use-case/update.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialUpdateController {
  constructor(private readonly useCase: TestimonialUpdateUseCase) {}

  // /**
  //  * @handle
  //  * @tag Depoimentos
  //  * @summary Atualização de Depoimento
  //  * @description Atualiza um depoimento existente
  //  * @paramPath id - ID do depoimento a ser atualizado - @type(string)
  //  * @requestBody {"name": "John Doe", "position": "CEO", "rating": "5 stars", "testimonial": "Updated testimonial!", "photo": null, "status": "Approved"}
  //  * @responseBody 200 - {"id": "uuid", "name": "John Doe", "position": "CEO", "rating": "5 stars", "testimonial": "Content here", "photo": null, "status": "Approved", "createdAt": "2023-01-01", "updatedAt": "2023-01-02"}
  //  * @responseBody 404 - {"message": "Depoimento não encontrado"}
  //  * @responseBody 500 - {"message": "Mensagem de erro interno"}
  //  */
  async handle(context: HttpContext): Promise<void> {
    const validator = TestimonialValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Depoimento não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
