import { UserContractRepository } from '#domain/user/application/repositories/user'
import { User } from '#domain/user/enterprise/entities/user'
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

  async paginate(payload: PaginationQuery): Promise<{ data: User[] }> {
    const users = this.items
      .filter(
        (u) => u.name.includes(payload.search ?? '') || u.email.includes(payload.search ?? '')
      )
      .slice((payload.page - 1) * payload.per_page, payload.page * payload.per_page)

    console.log({ users: users.length })

    const result = {
      data: users,
    }

    return result
  }

  async save(user: User): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user

    return user
  }

  async authenticate(payload: User): Promise<{ token: string }> {
    console.log({ payload })
    return {
      token: 'token',
    }
  }
}
