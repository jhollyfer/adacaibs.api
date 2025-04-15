import { Events, Paginated, Payload } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class EventContractRepository {
  abstract create(payload: Payload<Events>): Promise<Events>
  abstract findById(id: string): Promise<Events | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Events[]>>
  abstract save(payload: Payload<Events>): Promise<Events>
  abstract delete(id: string): Promise<void>
}
