import { Either, left, right } from '#core/either'
import { TestimonialSchema } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { TestimonialContractRepository } from '../repository.js'

type Result = Either<Error, null>
type Payload = Infer<(typeof TestimonialSchema)['delete']['params']>

@inject()
export default class TestimonialDeleteUserCase {
  constructor(private readonly testimonialRepository: TestimonialContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const testimonial = await this.testimonialRepository.findById(payload.id)
    if (!testimonial) return left(new Error('Testimonial não encontrado'))
    await this.testimonialRepository.delete(payload.id)
    return right(null)
  }
}
