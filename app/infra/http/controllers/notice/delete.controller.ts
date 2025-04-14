import NoticeDeleteUseCase from '#domain/notice/use-cases/delete.use-case'
import { NoticeValidator } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NoticeDeleteController {
  constructor(private readonly useCase: NoticeDeleteUseCase) {}

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
    const validator = NoticeValidator['delete']
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
