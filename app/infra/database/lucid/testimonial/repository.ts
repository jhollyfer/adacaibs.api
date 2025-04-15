import { Paginated, Payload, Testimonial } from '#core/entity'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import Model from '#infra/database/lucid/testimonial/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class TestimonialLucidRepository implements TestimonialContractRepository {
  async create(payload: Payload<Testimonial>): Promise<Testimonial> {
    const testimonial = await Model.create(payload)
    return this.toDomain(testimonial)
  }

  async save(payload: Payload<Testimonial>): Promise<Testimonial> {
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

  async findById(id: string): Promise<Testimonial | null> {
    const testimonial = await Model.query().where('id', id).first()
    if (!testimonial) return null
    return this.toDomain(testimonial)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Testimonial[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('testimonial', `%${payload?.search}%`))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Testimonial {
    return {
      id: raw.id,
      name: raw.name,
      position: raw.position,
      rating: raw.rating,
      testimonial: raw.testimonial,
      photo: raw.photo,
      status: raw.status,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt?.toJSDate()) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt?.toJSDate()) }),
    }
  }
}
