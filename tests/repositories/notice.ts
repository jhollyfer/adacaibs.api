import { Notice, Paginated, Payload } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class NoticeInMemoryRepository implements NoticeContractRepository {
  public items: Notice[] = []

  async create(payload: Payload<Notice>): Promise<Notice> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(payload: Payload<Notice>): Promise<Notice> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)
    this.items[itemIndex] = payload
    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findById(id: string): Promise<Notice | null> {
    const notice = this.items.find((u) => u.id === id)
    return notice || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Notice[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const notices = this.items
      .filter(
        (u) => u.title.includes(payload.search ?? '') || u.content.includes(payload.search ?? '')
      )
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Notice[]> = {
      data: notices,
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
