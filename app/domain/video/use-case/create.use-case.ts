import { Either, right } from '#core/either'
import { Video } from '#core/entity'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { VideoSchema } from '#infra/http/validators/video.validator'
import { VideoContractRepository } from '#domain/video/repository'

type Payload = Infer<(typeof VideoSchema)['create']['body']>

type Result = Either<Error, Video>

@inject()
export default class VideoCreateUseCase {
  constructor(private readonly videoRepository: VideoContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const video: Video = {
      ...payload,
    }

    await this.videoRepository.create(video)
    return right(video)
  }
}
