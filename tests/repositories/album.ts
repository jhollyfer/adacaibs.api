import { Album, Paginated } from '#core/entity'
import { AlbumContractRepository } from '#domain/album/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class AlbumInMemoryRepository implements AlbumContractRepository {
  public items: Album[] = []

  async create(payload: Album): Promise<Album> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(payload: Album): Promise<Album> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)
    this.items[itemIndex] = payload
    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findById(id: string): Promise<Album | null> {
    const album = this.items.find((u) => u.id === id)
    return album || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Album[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const albums = this.items
      .filter(
        (u) =>
          u.title.includes(payload.search ?? '') || u.description.includes(payload.search ?? '')
      )
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Album[]> = {
      data: albums,
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
