import { Either, right } from '#core/either'
import { News, Paginated } from '#core/entity'
import { NewsContractRepository } from '#domain/news/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<News[]>>

@inject()
export default class NewsPaginateUseCase {
  constructor(private readonly newsRepository: NewsContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.newsRepository.paginate(payload)
    return right(paginate)
  }
}
