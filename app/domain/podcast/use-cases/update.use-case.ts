import { Either, left, right } from '#core/either'
import { Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { PodcastSchema } from '#infra/http/validators/podcast.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof PodcastSchema)['update']['body']>
type Params = Infer<(typeof PodcastSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Podcast>

@inject()
export default class PodcastUpdateUseCase {
  constructor(private readonly podcastRepository: PodcastContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const podcast = await this.podcastRepository.findById(payload.id)

    if (!podcast) return left(new Error('Podcast não encontrado'))

    Object.assign(podcast, payload)

    await this.podcastRepository.save(podcast)
    return right(podcast)
  }
}
