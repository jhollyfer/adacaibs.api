import EventDeleteUseCase from '#domain/event/use-cases/delete.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventDeleteController {
  constructor(private readonly useCase: EventDeleteUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Excluir Evento
   * @description Excluir um evento específico pelo ID
   * @paramPath id - ID do evento a ser removido - @type(string)
   * @responseBody 204 - Sem conteúdo
   * @responseBody 404 - {"message": "Evento não encontrada"}
   * @responseBody 500 - {"message": "Mensagem de erro interno"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = EventValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Evento não encontrada':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
