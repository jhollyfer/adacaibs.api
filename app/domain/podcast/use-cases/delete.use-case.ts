import { Either, left, right } from '#core/either'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { PodcastSchema } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof PodcastSchema)['delete']['params']>

@inject()
export default class PodcastDeleteUserCase {
  constructor(private readonly podcastRepository: PodcastContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const podcast = await this.podcastRepository.findById(payload.id)
    if (!podcast) return left(new Error('Podcast nao encontrado'))
    await this.podcastRepository.delete(payload.id)
    return right(null)
  }
}
