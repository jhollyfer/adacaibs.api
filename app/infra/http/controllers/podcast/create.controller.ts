import PodcastCreateUseCase from '#domain/podcast/use-cases/create.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PodcastCreateController {
  constructor(private readonly useCase: PodcastCreateUseCase) {}

  /**
   * @handle
   * @tag Podcasts
   * @summary Criar Podcast
   * @description Endpoint para criação de novo episódio de podcast
   * @requestBody {"title": "Tecnologia na Atualidade", "date": "2024-05-20", "duration": "01:30:00", "presenters": ["Apresentador 1", "Apresentador 2"], "guests": ["Especialista Convidado"], "description": "Discussão sobre tendências tech", "cover": "https://exemplo.com/capa.jpg", "content": "Conteúdo detalhado do episódio..."}
   * @responseBody 201 - {"id":"1","title":"Tecnologia na Atualidade","date":"2024-05-20","duration":"01:30:00","presenters":["Apresentador 1","Apresentador 2"],"guests":["Especialista Convidado"],"description":"Discussão sobre tendências tech","cover":"https://exemplo.com/capa.jpg","content":"Conteúdo detalhado do episódio...","createdAt":"2024-05-15T12:00:00.000Z","updatedAt":"2024-05-15T12:00:00.000Z"}
   * @responseBody 500 - {"message":"Erro interno no servidor"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
