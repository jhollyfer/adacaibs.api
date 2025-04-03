import { Paginated, User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class UserInMemoryRepository implements UserContractRepository {
  public items: User[] = []

  async create(payload: User): Promise<User> {
    this.items.push(payload)
    return payload
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email)
    return user || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<User[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const users = this.items
      .filter(
        (u) => u.name.includes(payload.search ?? '') || u.email.includes(payload.search ?? '')
      )
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<User[]> = {
      data: users,
      meta: {},
    }

    return result
  }

  async save(user: User): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user

    return user
  }

  async authenticate(payload: User): Promise<{ token: string }> {
    return {
      token: 'token',
    }
  }
}
