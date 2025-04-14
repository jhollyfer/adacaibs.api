import { Paginated, Video } from '#core/entity'
import { VideoContractRepository } from '#domain/video/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class VideoInMemoryRepository implements VideoContractRepository {
  public items: Video[] = []

  async create(payload: Video): Promise<Video> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(payload: Video): Promise<Video> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)
    this.items[itemIndex] = payload
    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findById(id: string): Promise<Video | null> {
    const video = this.items.find((u) => u.id === id)
    return video || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Video[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const videos = this.items
      .filter((u) => u.title.includes(payload.search ?? ''))
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Video[]> = {
      data: videos,
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
