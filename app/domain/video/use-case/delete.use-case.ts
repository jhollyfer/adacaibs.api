import { Either, left, right } from '#core/either'
import { VideoSchema } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { VideoContractRepository } from '#domain/video/repository'

type Result = Either<Error, null>
type Payload = Infer<(typeof VideoSchema)['delete']['params']>

@inject()
export default class VideoDeleteUserCase {
  constructor(private readonly videoRepository: VideoContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const video = await this.videoRepository.findById(payload.id)
    if (!video) return left(new Error('Video não encontrado'))
    await this.videoRepository.delete(payload.id)
    return right(null)
  }
}
