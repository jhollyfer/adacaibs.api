import { Either, right } from '#core/either'
import { Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

import { PodcastSchema } from '#infra/http/validators/podcast.validator'

type Payload = Infer<(typeof PodcastSchema)['create']['body']>

type Result = Either<Error, Podcast>

@inject()
export default class PodcastCreateUseCase {
  constructor(private readonly podcastRepository: PodcastContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const podcast: Podcast = {
      ...payload,
    }

    await this.podcastRepository.create(podcast)
    return right(podcast)
  }
}
