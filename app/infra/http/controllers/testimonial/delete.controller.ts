import TestimonialDeleteUseCase from '#domain/testimonial/use-case/delete.use-case'
import { TestimonialValidator } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TestimonialDeleteController {
  constructor(private readonly useCase: TestimonialDeleteUseCase) {}

  /**
   * @handle
   * @tag Depoimentos
   * @summary Excluir Depoimento
   * @description Endpoint para remover permanentemente um depoimento
   * @paramPath id - ID único do depoimento - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @response 204 - Depoimento excluído com sucesso (sem conteúdo)
   * @responseBody 404 - {"message": "Depoimento não encontrado"}
   * @responseBody 500 - {"message": "Erro interno ao excluir depoimento"}
   */
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
