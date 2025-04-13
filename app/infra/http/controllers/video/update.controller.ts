import VideoUpdateUseCase from '#domain/video/use-case/update.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoUpdateController {
  constructor(private readonly useCase: VideoUpdateUseCase) {}

  /**
   * @handle
   * @tag Videos
   * @summary Update Video
   * @description Updates an existing video
   * @paramPath id - ID of the video to update - @type(string)
   * @requestBody {"title": "TypeScript Avançado", "date": "13/04/2025", "duration": "01:45:30", "instructor": "Jane Smith", "url": "https://exemplo.com/videos/typescript-avancado", "description": "Curso atualizado de TypeScript avançado", "thumbnail": "https://exemplo.com/thumbs/typescript-avancado.jpg"}
   * @responseBody 200 - {"id": "123", "title": "TypeScript Avançado", "date": "13/04/2025", "duration": "01:45:30", "instructor": "Jane Smith", "url": "https://exemplo.com/videos/typescript-avancado", "description": "Curso atualizado de TypeScript avançado", "thumbnail": "https://exemplo.com/thumbs/typescript-avancado.jpg", "createdAt": "2025-01-01T00:00:00.000Z", "updatedAt": "2025-04-13T15:30:00.000Z"}
   * @responseBody 404 - {"message": "Video não encontrado"}
   * @responseBody 500 - {"message": "Mensagem de erro interno"}
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
