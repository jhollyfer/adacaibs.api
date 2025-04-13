import { Either, left, right } from '#core/either'
import { Testimonial } from '#core/entity'
import { TestimonialSchema } from '#infra/http/validators/testimonial.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { TestimonialContractRepository } from '../repository.js'

type Body = Infer<(typeof TestimonialSchema)['update']['body']>
type Params = Infer<(typeof TestimonialSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Testimonial>

@inject()
export default class TestimonialUpdateUseCase {
  constructor(private readonly testimonialRepository: TestimonialContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const testimonial = await this.testimonialRepository.findById(payload.id)

    if (!testimonial) return left(new Error('Depoimento não encontrado'))

    Object.assign(testimonial, payload)

    await this.testimonialRepository.save(testimonial)
    return right(testimonial)
  }
}
