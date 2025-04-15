import TestimonialCreateUseCase from '#domain/testimonial/use-case/create.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialCreateController {
  constructor(private readonly useCase: TestimonialCreateUseCase) {}

  /**
   * @handle
   * @tag Depoimentos
   * @summary Criar Depoimento
   * @description Endpoint para criar um novo depoimento
   * @requestBody {"name":"João Silva","position":"CEO","rating":"5","testimonial":"Excelente serviço!","photo":"https://exemplo.com/foto.jpg","status":"PUBLISHED"}
   * @responseBody 201 - {"id":"1","name":"João Silva","position":"CEO","rating":"5","testimonial":"Excelente serviço!","photo":"https://exemplo.com/foto.jpg","status":"PUBLISHED","createdAt":"2024-05-20T10:00:00.000Z","updatedAt":"2024-05-20T10:00:00.000Z"}
   * @responseBody 500 - {"message":"Erro ao criar depoimento"}
   */
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
