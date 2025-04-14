import VideoCreateUseCase from '#domain/video/use-case/create.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoCreateController {
  constructor(private readonly useCase: VideoCreateUseCase) {}

  /**
   * @handle
   * @tag Vídeos
   * @summary Criar Vídeo
   * @description Endpoint para cadastrar um novo vídeo educacional
   * @requestBody {"title":"Introdução ao TypeScript","date":"2024-05-20","duration":"01:23:45","instructor":"John Doe","url":"https://exemplo.com/videos/typescript","description":"Tutorial completo de TypeScript","thumbnail":"https://exemplo.com/thumbs/typescript.jpg"}
   * @responseBody 201 - {"id":"1","title":"Introdução ao TypeScript","date":"2024-05-20","duration":"01:23:45","instructor":"John Doe","url":"https://exemplo.com/videos/typescript","description":"Tutorial completo de TypeScript","thumbnail":"https://exemplo.com/thumbs/typescript.jpg","createdAt":"2024-05-15T10:00:00.000Z","updatedAt":"2024-05-15T10:00:00.000Z"}
   * @responseBody 500 - {"message":"Erro interno no servidor"}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = VideoValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
