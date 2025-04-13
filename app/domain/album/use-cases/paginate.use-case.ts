import { Either, right } from '#core/either'
import { Album, Paginated } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<Album[]>>

@inject()
export default class AlbumPaginateUseCase {
  constructor(private readonly albumRepository: AlbumContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.albumRepository.paginate(payload)
    return right(paginate)
  }
}
