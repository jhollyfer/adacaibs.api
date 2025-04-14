import { TestimonialStatus } from '#core/constant'
import TestimonialCreateUseCase from '#domain/testimonial/use-case/create.use-case'
import TestimonialInMemoryRepository from '#tests/repositories/testimonial'
import { test } from '@japa/runner'

let testimonialRepository: TestimonialInMemoryRepository
let sut: TestimonialCreateUseCase

test.group('Testimonial > Create > Use Case', (group) => {
  group.each.setup(async () => {
    testimonialRepository = new TestimonialInMemoryRepository()
    sut = new TestimonialCreateUseCase(testimonialRepository)
  })

  test('it should be able to create a testimonial', async ({ expect }) => {
    const result = await sut.execute({
      name: 'Titulo da noticia',
      photo: 'Capa da noticia',
      position: 'Presentadores',
      rating: 'Convidados',
      status: TestimonialStatus.PENDING,
      testimonial: 'Descrição completo da noticia',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        name: 'Titulo da noticia',
        photo: 'Capa da noticia',
        position: 'Presentadores',
        rating: 'Convidados',
        status: TestimonialStatus.PENDING,
        testimonial: 'Descrição completo da noticia',
      })
    )
  })
})
