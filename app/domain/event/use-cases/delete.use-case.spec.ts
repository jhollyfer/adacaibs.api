import { EventCategory } from '#core/constant'
import EventDeleteUseCase from '#domain/event/use-cases/delete.use-case'
import EventInMemoryRepository from '#tests/repositories/event'
import { test } from '@japa/runner'

let eventRepository: EventInMemoryRepository
let sut: EventDeleteUseCase

test.group('Event > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    eventRepository = new EventInMemoryRepository()
    sut = new EventDeleteUseCase(eventRepository)
  })

  test('it should be able to delete a event', async ({ expect }) => {
    const created = await eventRepository.create({
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

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await eventRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
