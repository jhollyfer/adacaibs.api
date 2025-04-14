import { EventCategory } from '#core/constant'
import EventUpdateUseCase from '#domain/event/use-cases/update.use-case'
import EventInMemoryRepository from '#tests/repositories/event'
import { test } from '@japa/runner'

let eventRepository: EventInMemoryRepository
let sut: EventUpdateUseCase

test.group('Event > Update > Use Case', (group) => {
  group.each.setup(async () => {
    eventRepository = new EventInMemoryRepository()
    sut = new EventUpdateUseCase(eventRepository)
  })

  test('it should be able to update a event', async ({ expect }) => {
    const event = await eventRepository.create({
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
      id: event.id!,
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
