import { UserContractRepository } from '#domain/user/application/repositories/user'
import { User } from '#domain/user/enterprise/entities/user'
import { UserMapper } from '#infra/database/lucid/mappers/user'
import Model from '#infra/database/lucid/models/user'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class UserLucidRepository implements UserContractRepository {
  async create(payload: User): Promise<User> {
    const parsed = UserMapper.toLucid(payload)
    const user = await Model.create(parsed)
    return UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await Model.query().where('email', email).first()
    if (!user) return null
    return UserMapper.toDomain(user)
  }

  async paginate(payload: PaginationQuery): Promise<any> {
    const result = await Model.query()
      .if(payload?.search, (q) =>
        q.whereILike('name', payload?.search!).orWhereILike('email', payload?.search!)
      )
      .paginate(payload.page, payload.per_page)

    return result
  }
}
