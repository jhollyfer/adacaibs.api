import { Events, Paginated } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class EventInMemoryRepository implements EventContractRepository {
  public items: Events[] = []

  async create(payload: Events): Promise<Events> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(payload: Events): Promise<Events> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)
    this.items[itemIndex] = payload
    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findById(id: string): Promise<Events | null> {
    const event = this.items.find((u) => u.id === id)
    return event || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Events[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const events = this.items
      .filter(
        (u) =>
          u.title.includes(payload.search ?? '') || u.description.includes(payload.search ?? '')
      )
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Events[]> = {
      data: events,
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
