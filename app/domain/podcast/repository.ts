import { Paginated, Podcast } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class PodcastContractRepository {
  abstract create(payload: Podcast): Promise<Podcast>
  abstract findById(id: string): Promise<Podcast | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Podcast[]>>
  abstract save(payload: Podcast): Promise<Podcast>
  abstract delete(id: string): Promise<void>
}
