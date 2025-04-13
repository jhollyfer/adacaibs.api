import { Either, left, right } from '#core/either'
import { Album } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import { AlbumSchema } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof AlbumSchema)['update']['body']>
type Params = Infer<(typeof AlbumSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Album>

@inject()
export default class AlbumUpdateUseCase {
  constructor(private readonly albumRepository: AlbumContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const album = await this.albumRepository.findById(payload.id)

    if (!album) return left(new Error('Album não encontrado'))

    Object.assign(album, payload)

    await this.albumRepository.save(album)
    return right(album)
  }
}
