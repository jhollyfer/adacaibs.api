import { Paginated, Testimonial } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export abstract class TestimonialContractRepository {
  abstract create(payload: Testimonial): Promise<Testimonial>
  abstract findById(id: string): Promise<Testimonial | null>
  abstract paginate(payload: PaginationQuery): Promise<Paginated<Testimonial[]>>
  abstract save(payload: Testimonial): Promise<Testimonial>
  abstract delete(id: string): Promise<void>
}
