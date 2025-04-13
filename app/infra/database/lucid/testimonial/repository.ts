import { Paginated, Testimonial } from '#core/entity'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import Model from '#infra/database/lucid/testimonial/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { TestimonialMapper } from './mapper.js'

export default class TestimonialLucidRepository implements TestimonialContractRepository {
  async create(payload: Testimonial): Promise<Testimonial> {
    const parsed = TestimonialMapper.toLucid(payload)
    const testimonial = await Model.create(parsed)
    return TestimonialMapper.toDomain(testimonial)
  }

  async save(payload: Testimonial): Promise<Testimonial> {
    const parsed = TestimonialMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return TestimonialMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Testimonial | null> {
    const testimonial = await Model.query().where('id', id).first()
    if (!testimonial) return null
    return TestimonialMapper.toDomain(testimonial)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Testimonial[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('testimonial', payload?.search!))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(TestimonialMapper.toDomain)

    return { meta: json?.meta, data }
  }
}
