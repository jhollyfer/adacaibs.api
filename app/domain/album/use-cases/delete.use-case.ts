import { Either, left, right } from '#core/either'
import { AlbumContractRepository } from '#domain/album/repository'
import { AlbumSchema } from '#infra/http/validators/album.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof AlbumSchema)['delete']['params']>

@inject()
export default class AlbumDeleteUserCase {
  constructor(private readonly albumRepository: AlbumContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const album = await this.albumRepository.findById(payload.id)
    if (!album) return left(new Error('Album não encontrado'))
    await this.albumRepository.delete(payload.id)
    return right(null)
  }
}
