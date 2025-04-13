import { News, Paginated } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class NewsContractRepository {
  abstract create(payload: News): Promise<News>
  abstract findById(id: string): Promise<News | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<News[]>>
  abstract save(payload: News): Promise<News>
  abstract delete(id: string): Promise<void>
}
