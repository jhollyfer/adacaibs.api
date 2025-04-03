import { User } from '#domain/user/enterprise/entities/user'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class UserContractRepository {
  abstract create(payload: User): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
  abstract paginate(payload: PaginationQuery): Promise<{ data: User[] }>
  abstract save(payload: User): Promise<User>
  abstract authenticate(payload: User): Promise<{ token?: string }>
}
