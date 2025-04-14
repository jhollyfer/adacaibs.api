import { TestimonialStatus } from '#core/constant'
import { Testimonial } from '#core/entity'
import TestimonialPaginateUseCase from '#domain/testimonial/use-case/paginate.use-case'
import TestimonialInMemoryRepository from '#tests/repositories/testimonial'
import { test } from '@japa/runner'

let testimonialRepository: TestimonialInMemoryRepository
let sut: TestimonialPaginateUseCase

test.group('Testimonial > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    testimonialRepository = new TestimonialInMemoryRepository()
    sut = new TestimonialPaginateUseCase(testimonialRepository)
  })

  test('it should be able to paginate podcasts', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const testimonial: Testimonial = {
        name: 'Titulo da noticia',
        photo: 'Capa da noticia',
        position: 'Presentadores',
        rating: 'Convidados',
        status: TestimonialStatus.PENDING,
        testimonial: 'Descrição completo da noticia',
      }
      await testimonialRepository.create(testimonial)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
