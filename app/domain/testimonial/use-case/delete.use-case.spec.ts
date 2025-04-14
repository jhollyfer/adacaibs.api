import { TestimonialStatus } from '#core/constant'
import TestimonialDeleteUseCase from '#domain/testimonial/use-case/delete.use-case'
import TestimonialInMemoryRepository from '#tests/repositories/testimonial'
import { test } from '@japa/runner'

let testimonialRepository: TestimonialInMemoryRepository
let sut: TestimonialDeleteUseCase

test.group('Testimonial > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    testimonialRepository = new TestimonialInMemoryRepository()
    sut = new TestimonialDeleteUseCase(testimonialRepository)
  })

  test('it should be able to delete a testimonial', async ({ expect }) => {
    const created = await testimonialRepository.create({
      name: 'Titulo da noticia',
      photo: 'Capa da noticia',
      position: 'Presentadores',
      rating: 'Convidados',
      status: TestimonialStatus.PENDING,
      testimonial: 'Descrição completo da noticia',
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await testimonialRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
