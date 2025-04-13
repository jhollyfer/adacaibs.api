import NewsUpdateUseCase from '#domain/news/use-cases/update.use-case'
import { NewsValidator } from '#infra/http/validators/news.validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewsUpdateController {
  constructor(private readonly useCase: NewsUpdateUseCase) {}

  /**
   * @handle
   * @tag Noticias
   * @summary Atualização de Notícia
   * @description Atualiza os dados de uma notícia existente
   * @paramPath id - ID da notícia a ser atualizada - @type(string)
   * @requestBody {"title": "Notícia atualizada", "category": "EDUCATION", "status": "PUBLISHED", "resume": "Resumo atualizado", "content": "Conteúdo atualizado", "cover": "https://exemplo.com/nova-imagem.jpg", "tags": ["educação", "atualização"]}
   * @responseBody 200 - {"id": "123", "title": "Notícia atualizada", "category": "EDUCATION", "status": "PUBLISHED", "resume": "Resumo atualizado", "content": "Conteúdo atualizado", "cover": "https://exemplo.com/nova-imagem.jpg", "tags": ["educação", "atualização"], "createdAt": "2023-01-01T00:00:00.000Z", "updatedAt": "2023-01-02T00:00:00.000Z"}
   * @responseBody 404 - {"message": "Noticia não encontrado"}
   * @responseBody 500 - {"message": "Mensagem de erro interno"}
   */
  async handle(context: HttpContext): Promise<void> {
    const validator = NewsValidator['update']
    const body = await validator['body'].validate(context.request.body())
    const params = await validator['params'].validate(context.request.params())
    const result = await this.useCase.execute({ ...body, ...params })

    if (result.isLeft()) {
      const error = result.value
      switch (error.message) {
        case 'Noticia não encontrado':
          return context.response.notFound({ message: error.message })
        default:
          return context.response.internalServerError({ message: error.message })
      }
    }

    return context.response.ok(result.value)
  }
}
