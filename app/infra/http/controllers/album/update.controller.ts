import AlbumUpdateUseCase from '#domain/album/use-cases/update.use-case'
import { AlbumValidator } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumUpdateController {
  constructor(private readonly useCase: AlbumUpdateUseCase) {}

  /**
   * @handle
   * @tag Albums
   * @summary Atualizar Álbum
   * @description Endpoint para atualizar um álbum existente
   * @paramPath id - ID do álbum a ser atualizado - @type(string)
   * @requestBody {"title": "Meu Album Atualizado", "date": "2024-04-15", "description": "Nova descrição", "cover": "https://exemplo.com/nova-capa.jpg", "images": ["https://exemplo.com/nova-imagem1.jpg"]}
   * @responseBody 200 - {"id": "123", "title": "Meu Album Atualizado", "date": "2024-04-15", "description": "Nova descrição", "cover": "https://exemplo.com/nova-capa.jpg", "images": ["https://exemplo.com/nova-imagem1.jpg"], "createdAt": "2024-01-01T00:00:00.000Z", "updatedAt": "2024-04-15T12:30:00.000Z"}
   * @responseBody 404 - {"message": "Album não encontrado"}
   * @responseBody 500 - {"message": "Erro interno no servidor"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = AlbumValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Album não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
