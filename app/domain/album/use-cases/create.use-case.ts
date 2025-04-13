import { Either, right } from '#core/either'
import { Album } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import { AlbumSchema } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof AlbumSchema)['create']['body']>

type Result = Either<Error, Album>

@inject()
export default class AlbumCreateUseCase {
  constructor(private readonly albumRepository: AlbumContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const album: Album = {
      ...payload,
    }

    await this.albumRepository.create(album)
    return right(album)
  }
}
