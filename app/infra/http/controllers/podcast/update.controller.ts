import PodcastUpdateUseCase from '#domain/podcast/use-cases/update.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PodcastUpdateController {
  constructor(private readonly useCase: PodcastUpdateUseCase) {}

  /**
   * @handle
   * @tag Podcasts
   * @summary Atualizar Podcast
   * @description Endpoint para atualizar um episódio de podcast existente
   * @paramPath id - ID único do podcast - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @requestBody {"title": "Atualização Tech","date": "2024-05-25","duration": "01:15:00","presenters": ["Novo Apresentador"],"guests": ["Novo Convidado"],"description": "Descrição atualizada","cover": "https://exemplo.com/nova-capa.jpg","content": "Conteúdo revisado"}
   * @responseBody 200 - {"id":"550e8400-e29b-41d4-a716-446655440000","title":"Atualização Tech","date":"2024-05-25","duration":"01:15:00","presenters":["Novo Apresentador"],"guests":["Novo Convidado"],"description":"Descrição atualizada","cover":"https://exemplo.com/nova-capa.jpg","content":"Conteúdo revisado","createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-25T15:30:00.000Z"}
   * @responseBody 404 - {"message":"Podcast não encontrado"}
   * @responseBody 500 - {"message":"Erro ao atualizar podcast"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Podcast não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
