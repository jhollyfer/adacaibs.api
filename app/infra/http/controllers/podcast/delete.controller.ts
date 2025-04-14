import PodcastDeleteUseCase from '#domain/podcast/use-cases/delete.use-case'
import { PodcastValidator } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PodcastDeleteController {
  constructor(private readonly useCase: PodcastDeleteUseCase) {}

  /**
   * @handle
   * @tag Podcasts
   * @summary Excluir Podcast
   * @description Endpoint para excluir permanentemente um episódio de podcast
   * @paramPath id - ID único do podcast - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @response 204 - Podcast excluído com sucesso (sem conteúdo)
   * @responseBody 404 - {"message": "Podcast não encontrado"}
   * @responseBody 500 - {"message": "Erro interno ao excluir podcast"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = PodcastValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Podcast nao encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
