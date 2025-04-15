import AlbumPaginateUseCase from '#domain/album/use-cases/paginate.use-case'
import { AlbumValidator } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AlbumPaginateController {
  constructor(private readonly useCase: AlbumPaginateUseCase) {}

  /**
   * @handle
   * @tag Albums
   * @summary Listagem Paginada de Álbuns
   * @description Endpoint para listar álbuns com paginação e busca
   * @paramQuery page - Número da página - @type(number) @example(1)
   * @paramQuery perPage - Quantidade de itens por página - @type(number) @example(10)
   * @paramQuery search - Termo para filtragem de álbuns - @type(string) @example("Aniversário")
   * @responseBody 200 - { "meta": { "total": 50, "currentPage": 1, "perPage": 10, "lastPage": 5 }, "data": [ { "id": "1", "title": "Festa de Aniversário", "date": "2024-03-15", "description": "Álbum com fotos da celebração", "cover": "https://exemplo.com/capa.jpg", "images": ["https://exemplo.com/foto1.jpg", "https://exemplo.com/foto2.jpg"], "createdAt": "2024-03-16T08:00:00.000Z", "updatedAt": "2024-03-16T08:00:00.000Z" } ] }
   * @responseBody 401 - {"message": "Acesso não autorizado"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = AlbumValidator['paginate']
    const {
      page = 1,
      perPage = 10,
      search,
    } = await validator['query'].validate(context.request.qs())
    const result = await this.useCase.execute({ page, perPage, search })
    return context.response.ok(result.value)
  }
}
