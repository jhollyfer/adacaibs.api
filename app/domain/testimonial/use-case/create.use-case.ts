import { Either, right } from '#core/either'
import { Testimonial } from '#core/entity'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

import { TestimonialContractRepository } from '#domain/testimonial/repository'
import { TestimonialSchema } from '#infra/http/validators/testimonial.validator'

type Payload = Infer<(typeof TestimonialSchema)['create']['body']>

type Result = Either<Error, Testimonial>

@inject()
export default class TestimonialCreateUseCase {
  constructor(private readonly testimonialRepository: TestimonialContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const testimonial: Testimonial = {
      ...payload,
    }

    await this.testimonialRepository.create(testimonial)
    return right(testimonial)
  }
}
