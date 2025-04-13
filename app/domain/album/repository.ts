import type { Album, Paginated } from '#core/entity'
import type { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class AlbumContractRepository {
  abstract create(payload: Album): Promise<Album>
  abstract save(payload: Album): Promise<Album>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Album | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Album[]>>
}
