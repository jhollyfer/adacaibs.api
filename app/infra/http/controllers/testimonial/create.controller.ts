import TestimonialCreateUseCase from '#domain/testimonial/use-case/create.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialCreateController {
  constructor(private readonly useCase: TestimonialCreateUseCase) {}

  // /**
  //  * @handle
  //  * @tag Testimonials
  //  * @summary Criação de Depoimento
  //  * @description Criação de Depoimento
  //  * @requestBody {"name": "John Doe", "position": "CEO", "rating": "5 stars", "testimonial": "Great service!", "photo": null, "status": "Pending"}
  //  * @responseBody 201 - <Testimonial>
  //  */

  async handle(context: HttpContext): Promise<void> {
    const validator = TestimonialValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
