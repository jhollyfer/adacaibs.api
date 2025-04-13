import { Paginated, Podcast } from '#core/entity'
import { PodcastContractRepository } from '#domain/podcast/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class PodcastInMemoryRepository implements PodcastContractRepository {
  public items: Podcast[] = []

  async create(payload: Podcast): Promise<Podcast> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async findById(id: string): Promise<Podcast | null> {
    const podcast = this.items.find((u) => u.id === id)
    return podcast || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Podcast[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const podcasts = this.items
      .filter(
        (u) =>
          u.title.includes(payload.search ?? '') || u.description.includes(payload.search ?? '')
      )
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Podcast[]> = {
      data: podcasts,
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

  async save(payload: Podcast): Promise<Podcast> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)

    this.items[itemIndex] = payload

    return payload
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }
}
