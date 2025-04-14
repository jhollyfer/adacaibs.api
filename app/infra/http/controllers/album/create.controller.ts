import AlbumCreateUseCase from '#domain/album/use-cases/create.use-case'
import { AlbumValidator } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumCreateController {
  constructor(private readonly useCase: AlbumCreateUseCase) {}

  /**
   * @handle
   * @tag Albums
   * @summary Criação de Album
   * @description Endpoint para criação de um novo álbum com dados básicos
   * @requestBody {"title": "Meu Album", "date": "2024-04-13", "description": "Descrição do album", "cover": "https://example.com/cover.jpg", "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]}
   * @responseBody 201 - {"id": 1, "title": "Meu Album", "date": "2024-04-13", "description": "Descrição do album", "cover": "https://example.com/cover.jpg", "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]}
   */

  async handle(context: HttpContext): Promise<void> {
    const validator = AlbumValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
