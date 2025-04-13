import { Either, left, right } from '#core/either'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { inject } from '@adonisjs/core'

type Result = Either<Error, null>

@inject()
export default class PodcastDeleteUserCase {
  constructor(private readonly podcastRepository: PodcastContractRepository) {}
  async execute(payload: any): Promise<Result> {
    const podcast = await this.podcastRepository.findById(payload.id)
    if (!podcast) return left(new Error('Podcast nao encontrado'))
    await this.podcastRepository.delete(payload.id)
    return right(null)
  }
}
