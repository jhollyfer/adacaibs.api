import { Paginated, User } from '#core/entity'
import { UserContractRepository } from '#domain/user/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class UserInMemoryRepository implements UserContractRepository {
  public items: User[] = []

  async authenticate(payload: User): Promise<{ token: string }> {
    return {
      token: 'token to '.concat(payload.id || ''),
    }
  }

  async create(payload: User): Promise<User> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(user: User): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user

    return user
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email)
    return user || null
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((u) => u.id === id)
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
      meta: {
        total: this.items.length,
        page,
        perPage,
        currentPage: page,
        lastPage: Math.ceil(this.items.length / perPage),
        firstPage: 1,
        firstPageUrl: null,
        lastPageUrl: null,
        nextPageUrl: null,
        previousPageUrl: null,
      },
    }

    return result
  }
}
