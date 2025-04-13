import { Paginated, Video } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class VideoContractRepository {
  abstract create(payload: Video): Promise<Video>
  abstract findById(id: string): Promise<Video | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Video[]>>
  abstract save(payload: Video): Promise<Video>
  abstract delete(id: string): Promise<void>
}
