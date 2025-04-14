import AlbumDeleteUseCase from '#domain/album/use-cases/delete.use-case'
import { AlbumValidator } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumDeleteController {
  constructor(private readonly useCase: AlbumDeleteUseCase) {}

  /**
   * @handle
   * @tag Albums
   * @summary Excluir Álbum
   * @description Endpoint para excluir permanentemente um álbum específico
   * @paramPath id - ID único do álbum a ser excluído - @type(string) @example("550e8400-e29b-41d4-a716-446655440000")
   * @response 204 - Álbum excluído com sucesso (sem conteúdo)
   * @responseBody 404 - {"message": "Album não encontrado"}
   * @responseBody 500 - {"message": "Falha ao excluir o álbum"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = AlbumValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Album não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
