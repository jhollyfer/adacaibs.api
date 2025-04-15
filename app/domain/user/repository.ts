import type { Paginated, Payload, User } from '#core/entity'
import type { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class UserContractRepository {
  abstract authenticate(payload: User): Promise<{ token?: string }>
  abstract create(payload: Payload<User>): Promise<User>
  abstract save(payload: Payload<User>): Promise<User>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<User[]>>
}
