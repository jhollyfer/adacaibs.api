import { Paginated, User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { UserMapper } from '#infra/database/lucid/user/mapper'
import Model from '#infra/database/lucid/user/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class UserLucidRepository implements UserContractRepository {
  async authenticate(payload: User): Promise<{ token?: string }> {
    const parsed = UserMapper.toLucid(payload)
    const authenticate = await Model.tokens.create(parsed)
    const { token } = authenticate?.toJSON()
    return { token }
  }

  async create(payload: User): Promise<User> {
    const parsed = UserMapper.toLucid(payload)
    const user = await Model.create(parsed)
    return UserMapper.toDomain(user)
  }

  async save(payload: User): Promise<User> {
    const parsed = UserMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return UserMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await Model.query().where('email', email).first()
    if (!user) return null
    return UserMapper.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await Model.query().where('id', id).first()
    if (!user) return null
    return UserMapper.toDomain(user)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<User[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q.whereILike('name', payload?.search!).orWhereILike('email', payload?.search!)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map((item) => UserMapper.toDomain(item))

    return { meta: json?.meta, data }
  }
}
