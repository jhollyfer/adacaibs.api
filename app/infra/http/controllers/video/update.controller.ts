import VideoUpdateUseCase from '#domain/video/use-case/update.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoUpdateController {
  constructor(private readonly useCase: VideoUpdateUseCase) {}

  /**
   * @handle
   * @tag Vídeos
   * @summary Atualizar Vídeo
   * @description Endpoint para atualizar os dados de um vídeo existente
   * @paramPath id - ID único do vídeo - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @requestBody {"title":"TypeScript Avançado","date":"2024-05-25","duration":"02:00:00","instructor":"John Doe","url":"https://exemplo.com/videos/typescript-avancado","description":"Conteúdo atualizado","thumbnail":"https://exemplo.com/novo-thumbnail.jpg"}
   * @responseBody 200 - {"id":"1","title":"TypeScript Avançado","date":"2024-05-25","duration":"02:00:00","instructor":"John Doe","url":"https://exemplo.com/videos/typescript-avancado","description":"Conteúdo atualizado","thumbnail":"https://exemplo.com/novo-thumbnail.jpg","createdAt":"2024-05-01T00:00:00.000Z","updatedAt":"2024-05-25T15:30:00.000Z"}
   * @responseBody 404 - {"message":"Video não encontrado"}
   * @responseBody 500 - {"message":"Erro ao atualizar vídeo"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = VideoValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Video não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
