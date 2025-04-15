import VideoDeleteUseCase from '#domain/video/use-case/delete.use-case'
import { VideoValidator } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class VideoDeleteController {
  constructor(private readonly useCase: VideoDeleteUseCase) {}

  /**
   * @handle
   * @tag Vídeos
   * @summary Excluir Vídeo
   * @description Endpoint para remover permanentemente um vídeo
   * @paramPath id - ID único do vídeo - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @response 204 - Vídeo excluído com sucesso (sem conteúdo)
   * @responseBody 404 - {"message": "Video nao encontrado"}
   * @responseBody 500 - {"message": "Erro interno ao excluir vídeo"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = VideoValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Video nao encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
