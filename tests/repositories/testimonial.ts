import { Paginated, Payload, Testimonial } from '#core/entity'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { randomUUID } from 'node:crypto'

export default class TestimonialInMemoryRepository implements TestimonialContractRepository {
  public items: Testimonial[] = []

  async create(payload: Payload<Testimonial>): Promise<Testimonial> {
    const id = randomUUID()
    this.items.push({
      id,
      ...payload,
    })
    return { id, ...payload }
  }

  async save(payload: Payload<Testimonial>): Promise<Testimonial> {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id)
    this.items[itemIndex] = payload
    return this.items[itemIndex]
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id)
  }

  async findById(id: string): Promise<Testimonial | null> {
    const testimonial = this.items.find((u) => u.id === id)
    return testimonial || null
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Testimonial[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)
    const testimonials = this.items
      .filter((u) => u.name.includes(payload.search ?? ''))
      .slice((page - 1) * perPage, page * perPage)

    const result: Paginated<Testimonial[]> = {
      data: testimonials,
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
