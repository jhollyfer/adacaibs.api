import { Either, right } from '#core/either'
import { Paginated, Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<Podcast[]>>

@inject()
export default class PodcastPaginateUseCase {
  constructor(private readonly podcastRepository: PodcastContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.podcastRepository.paginate(payload)
    return right(paginate)
  }
}
