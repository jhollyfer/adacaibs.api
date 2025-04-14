import EventCreateUseCase from '#domain/event/use-cases/create.use-case'
import { EventValidator } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventCreateController {
  constructor(private readonly useCase: EventCreateUseCase) {}

  /**
   * @handle
   * @tag Eventos
   * @summary Criar Evento
   * @description Endpoint para criação de um novo evento com todos os detalhes necessários
   * @requestBody {"title": "Workshop de TypeScript", "date": "2025-05-15", "hour": "14:00", "location": "Centro de Tecnologia", "address": "Rua das Inovações, 123", "category": "WORKSHOP", "capacity": 100, "description": "Introdução prática ao TypeScript", "detailedContent": "Conteúdo detalhado com exemplos práticos...", "cover": "https://exemplo.com/capa-evento.jpg"}
   * @responseBody 201 - {"id": "550e8400-e29b-41d4-a716-446655440000", "title": "Workshop de TypeScript", "date": "2025-05-15", "hour": "14:00", "location": "Centro de Tecnologia", "address": "Rua das Inovações, 123", "category": "WORKSHOP", "capacity": 100, "description": "Introdução prática ao TypeScript", "detailedContent": "Conteúdo detalhado com exemplos práticos...", "cover": "https://exemplo.com/capa-evento.jpg", "createdAt": "2025-05-01T10:00:00.000Z", "updatedAt": "2025-05-01T10:00:00.000Z"}
   * @responseBody 500 - {"message": "Erro interno no servidor"}
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
