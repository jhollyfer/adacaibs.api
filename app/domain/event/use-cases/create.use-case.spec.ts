import { EventCategory } from '#core/constant'
import EventCreateUseCase from '#domain/event/use-cases/create.use-case'
import EventInMemoryRepository from '#tests/repositories/event'
import { test } from '@japa/runner'

let eventRepository: EventInMemoryRepository
let sut: EventCreateUseCase

test.group('Event > Create > Use Case', (group) => {
  group.each.setup(async () => {
    eventRepository = new EventInMemoryRepository()
    sut = new EventCreateUseCase(eventRepository)
  })

  test('it should be able to create a event', async ({ expect }) => {
    const result = await sut.execute({
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
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
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
      })
    )
  })
})
