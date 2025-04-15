import { Paginated, Payload, Podcast } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class PodcastContractRepository {
  abstract create(payload: Payload<Podcast>): Promise<Podcast>
  abstract findById(id: string): Promise<Podcast | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Podcast[]>>
  abstract save(payload: Payload<Podcast>): Promise<Podcast>
  abstract delete(id: string): Promise<void>
}
