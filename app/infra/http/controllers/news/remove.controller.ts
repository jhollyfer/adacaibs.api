import NewsRemoveUserCase from '#domain/news/use-cases/remove.use-case'
import { NewsValidator } from '#infra/http/validators/news.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NewsRemoveController {
  constructor(private readonly useCase: NewsRemoveUserCase) {}

  /**
   * @handle
   * @tag Noticias
   * @summary Remoção de Notícia
   * @description Remove uma notícia específica pelo ID
   * @paramPath id - ID da notícia a ser removida - @type(string)
   * @responseBody 204 - Sem conteúdo
   * @responseBody 404 - {"message": "Noticia não encontrada"}
   * @responseBody 500 - {"message": "Mensagem de erro interno"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = NewsValidator['delete']
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Noticia não encontrada':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.noContent()
  }
}
