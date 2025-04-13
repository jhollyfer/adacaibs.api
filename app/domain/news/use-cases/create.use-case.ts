import { Either, right } from '#core/either'
import { News } from '#core/entity'
import { NewsSchema } from '#infra/http/validators/news.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { NewsContractRepository } from '../repository.js'

type Payload = Infer<(typeof NewsSchema)['create']['body']>

type Result = Either<Error, News>

@inject()
export default class NewsCreateUseCase {
  constructor(private readonly newsRepository: NewsContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const news: News = {
      ...payload,
      tags: payload.tags || [],
    }

    await this.newsRepository.create(news)
    return right(news)
  }
}
