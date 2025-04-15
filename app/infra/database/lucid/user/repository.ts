import { Paginated, Payload, User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import Model from '#infra/database/lucid/user/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class UserLucidRepository implements UserContractRepository {
  async authenticate(payload: User): Promise<{ token?: string }> {
    const user = await Model.query().where('id', payload?.id!).firstOrFail()
    const authenticate = await Model.tokens.create(user)
    const { token } = authenticate?.toJSON()
    return { token }
  }

  async create(payload: Payload<User>): Promise<User> {
    const user = await Model.create(payload)
    return this.toDomain(user)
  }

  async save(payload: Payload<User>): Promise<User> {
    const old = await Model.query().where('id', payload?.id!).firstOrFail()
    const updated = await old
      .merge({
        ...old?.toJSON(),
        ...payload,
      })
      .save()
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await Model.query().where('email', email).first()
    if (!user) return null
    return this.toDomain(user)
  }

  async findById(id: string): Promise<User | null> {
    const user = await Model.query().where('id', id).first()
    if (!user) return null
    return this.toDomain(user)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<User[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) =>
        q.whereILike('name', `%${payload?.search}%`).orWhereILike('email', `%${payload?.search}%`)
      )
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): User {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      role: raw.role,
      status: raw.status,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }
}
