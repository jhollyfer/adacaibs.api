import { Either, left, right } from '#core/either'
import { Video } from '#core/entity'
import { VideoSchema } from '#infra/http/validators/video.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { VideoContractRepository } from '#domain/video/repository'

type Body = Infer<(typeof VideoSchema)['update']['body']>
type Params = Infer<(typeof VideoSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Video>

@inject()
export default class VideoUpdateUseCase {
  constructor(private readonly videoRepository: VideoContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const video = await this.videoRepository.findById(payload.id)

    if (!video) return left(new Error('Video não encontrado'))

    Object.assign(video, payload)

    await this.videoRepository.save(video)
    return right(video)
  }
}
