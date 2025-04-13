import VideoCreateUseCase from '#domain/video/use-case/create.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoCreateController {
  constructor(private readonly useCase: VideoCreateUseCase) {}

  /**
   * @handle
   * @tag Videos
   * @summary Criação de Video
   * @description Criação de Video
   * @requestBody {"title": "Como usar TypeScript", "date": "2025-04-13", "duration": "01:23:45", "instructor": "John Doe", "url": "https://example.com/videos/typescript", "description": "Tutorial completo de TypeScript", "thumbnail": "https://example.com/thumbs/typescript.jpg"}
   * @responseBody 201 - <Video>
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
