import { Either, left, right } from '#core/either'
import { News } from '#core/entity'
import { NewsContractRepository } from '#domain/news/repository'
import { NewsSchema } from '#infra/http/validators/news.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof NewsSchema)['update']['body']>
type Params = Infer<(typeof NewsSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, News>

@inject()
export default class NewsUpdateUseCase {
  constructor(private readonly newsRepository: NewsContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const news = await this.newsRepository.findById(payload.id)

    if (!news) return left(new Error('Noticia não encontrado'))

    Object.assign(news, payload)

    await this.newsRepository.save(news)
    return right(news)
  }
}
