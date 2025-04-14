import { EventCategory } from '#core/constant'
import { Events } from '#core/entity'
import EventPaginateUseCase from '#domain/event/use-cases/paginate.use-case'
import EventInMemoryRepository from '#tests/repositories/event'
import { test } from '@japa/runner'

let eventRepository: EventInMemoryRepository
let sut: EventPaginateUseCase

test.group('Event > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    eventRepository = new EventInMemoryRepository()
    sut = new EventPaginateUseCase(eventRepository)
  })

  test('it should be able to paginate events', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const event: Events = {
        address: 'Endereço do evento',
        capacity: 100,
        category: EventCategory.COMMUNITY,
        cover: 'Capa do evento',
        date: '2023-01-01',
        description: 'Descrição completa do evento',
        detailedContent: 'Conteúdo detalhado do evento',
        hour: '10:00 - 14:00',
        location: 'Local do evento',
        title: 'Titulo do evento',
      }
      await eventRepository.create(event)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
