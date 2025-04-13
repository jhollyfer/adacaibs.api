import NoticeCreateUseCase from '#domain/notice/use-cases/create.use-case'
import { NoticeValidator } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class NoticeCreateController {
  constructor(private readonly useCase: NoticeCreateUseCase) {}

  /**
   * @handle
   * @tag Noticias
   * @summary Criação de Noticia
   * @description Criação de Noticias
   * @requestBody {"title": "Notícia importante", "category": "EDUCATION","status": "DRAFT","resume": "Um breve resumo da notícia","content": "Conteúdo completo da notícia","cover": "https://exemplo.com/imagem.jpg", "tags": ["educação", "tecnologia"]}
   * @responseBody 201 - {"title": "Notícia importante", "category": "EDUCATION","status": "DRAFT","resume": "Um breve resumo da notícia","content": "Conteúdo completo da notícia","cover": "https://exemplo.com/imagem.jpg", "tags": ["educação", "tecnologia"]}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = NoticeValidator['create']
    const payload = await validator['body'].validate(context.request.body())
    const result = await this.useCase.execute(payload)

    if (result.isLeft()) {
      const error = result.value
      return context.response.internalServerError({ message: error.message })
    }

    return context.response.created(result.value)
  }
}
