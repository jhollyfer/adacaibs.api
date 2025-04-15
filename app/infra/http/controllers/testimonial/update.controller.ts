import TestimonialUpdateUseCase from '#domain/testimonial/use-case/update.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialUpdateController {
  constructor(private readonly useCase: TestimonialUpdateUseCase) {}

  /**
   * @handle
   * @tag Depoimentos
   * @summary Atualizar Depoimento
   * @description Endpoint para atualizar um depoimento existente
   * @paramPath id - ID único do depoimento - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @requestBody {"name":"João Silva Atualizado","position":"CEO & Founder","rating":"5","testimonial":"Serviço excepcional!","photo":"https://exemplo.com/nova-foto.jpg","status":"PUBLISHED"}
   * @responseBody 200 - {"id":"1","name":"João Silva Atualizado","position":"CEO & Founder","rating":"5","testimonial":"Serviço excepcional!","photo":"https://exemplo.com/nova-foto.jpg","status":"PUBLISHED","createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-20T15:30:00.000Z"}
   * @responseBody 404 - {"message":"Depoimento não encontrado"}
   * @responseBody 500 - {"message":"Erro ao atualizar depoimento"}
   */
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
