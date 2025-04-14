import { Either, right } from '#core/either'
import { Paginated, Testimonial } from '#core/entity'
import { TestimonialContractRepository } from '#domain/testimonial/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<Testimonial[]>>

@inject()
export default class TestimonialPaginateUseCase {
  constructor(private readonly testimonialRepository: TestimonialContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.testimonialRepository.paginate(payload)
    return right(paginate)
  }
}
