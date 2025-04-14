import { TestimonialStatus } from '#core/constant'
import TestimonialUpdateUseCase from '#domain/testimonial/use-case/update.use-case'
import TestimonialInMemoryRepository from '#tests/repositories/testimonial'
import { test } from '@japa/runner'

let testimonialRepository: TestimonialInMemoryRepository
let sut: TestimonialUpdateUseCase

test.group('Testimonial > Update > Use Case', (group) => {
  group.each.setup(async () => {
    testimonialRepository = new TestimonialInMemoryRepository()
    sut = new TestimonialUpdateUseCase(testimonialRepository)
  })

  test('it should be able to update a testimonial', async ({ expect }) => {
    const podcast = await testimonialRepository.create({
      name: 'Titulo da noticia',
      photo: 'Capa da noticia',
      position: 'Presentadores',
      rating: 'Convidados',
      status: TestimonialStatus.PENDING,
      testimonial: 'Descrição completo da noticia',
    })

    const result = await sut.execute({
      name: 'Titulo da noticia',
      photo: 'Capa da noticia',
      position: 'Presentadores',
      rating: 'Convidados',
      status: TestimonialStatus.PENDING,
      testimonial: 'Descrição completo da noticia',
      id: podcast.id!,
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
