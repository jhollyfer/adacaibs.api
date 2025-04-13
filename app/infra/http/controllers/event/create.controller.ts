import EventsCreateUseCase from '#domain/event/use-cases/create.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventsCreateController {
  constructor(private readonly useCase: EventsCreateUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Criar Evento
   * @description Criar um novo exemplo
   * @requestBody {"title": "Workshop de Programação", "date": "15/05/2025", "hour": "14:00 - 18:00", "location": "Centro de Convenções", "address": "Av. Principal, 1000, Centro", "category": "WORKSHOP", "capacity": 50, "description": "Workshop prático sobre programação", "detailedContent": "Neste workshop você aprenderá as bases da programação moderna.<br>Traga seu computador.", "cover": "https://exemplo.com/imagem.jpg"}
   * @responseBody 201 - {"id": "1", "title": "Workshop de Programação", "date": "15/05/2025", "hour": "14:00 - 18:00", "location": "Centro de Convenções", "address": "Av. Principal, 1000, Centro", "category": "WORKSHOP", "capacity": 50, "description": "Workshop prático sobre programação", "detailedContent": "Neste workshop você aprenderá as bases da programação moderna.<br>Traga seu computador.", "cover": "https://exemplo.com/imagem.jpg", "createdAt": "2025-04-13T12:34:56.789Z", "updatedAt": "2025-04-13T12:34:56.789Z"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = EventValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
