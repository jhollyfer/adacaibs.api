import { Either, right } from '#core/either'
import { Paginated, Video } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'
import { VideoContractRepository } from '#domain/video/repository'

type Result = Either<null, Paginated<Video[]>>

@inject()
export default class VideoPaginateUseCase {
  constructor(private readonly videoRepository: VideoContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.videoRepository.paginate(payload)
    return right(paginate)
  }
}
