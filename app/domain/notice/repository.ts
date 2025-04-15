import { Notice, Paginated, Payload } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class NoticeContractRepository {
  abstract create(payload: Payload<Notice>): Promise<Notice>
  abstract findById(id: string): Promise<Notice | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Notice[]>>
  abstract save(payload: Payload<Notice>): Promise<Notice>
  abstract delete(id: string): Promise<void>
}
