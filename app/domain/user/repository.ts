import { Paginated, User } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class UserContractRepository {
  abstract authenticate(payload: User): Promise<{ token?: string }>
  abstract create(payload: User): Promise<User>
  abstract save(payload: User): Promise<User>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<User[]>>
}
