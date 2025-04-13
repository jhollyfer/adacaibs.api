import EventsUpdateUseCase from '#domain/event/use-cases/update.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventsUpdateController {
  constructor(private readonly useCase: EventsUpdateUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Atualizar Evento
   * @description Atualizar um evento existente
   * @paramPath id - ID of the event to update - @type(string)
   * @requestBody {"title": "Workshop Atualizado", "date": "20/05/2025", "hour": "10:00 - 14:00", "location": "Centro de Eventos", "address": "Rua Nova, 200, Centro", "category": "WORKSHOP", "capacity": 75, "description": "Descrição atualizada do workshop", "detailedContent": "Conteúdo detalhado atualizado", "cover": "https://exemplo.com/nova-imagem.jpg"}
   * @responseBody 200 - {"id": "123", "title": "Workshop Atualizado", "date": "20/05/2025", "hour": "10:00 - 14:00", "location": "Centro de Eventos", "address": "Rua Nova, 200, Centro", "category": "WORKSHOP", "capacity": 75, "description": "Descrição atualizada do workshop", "detailedContent": "Conteúdo detalhado atualizado", "cover": "https://exemplo.com/nova-imagem.jpg", "createdAt": "2025-01-01T00:00:00.000Z", "updatedAt": "2025-04-13T15:30:00.000Z"}
   * @responseBody 404 - {"message": "Evento não encontrado"}
   * @responseBody 500 - {"message": "Mensagem de erro interno"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = EventValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Evento não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
