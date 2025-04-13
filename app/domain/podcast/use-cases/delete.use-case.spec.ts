import PodcastDeleteUserCase from '#domain/podcast/use-cases/delete.use-case'
import PodcastInMemoryRepository from '#tests/repositories/podcast'
import { test } from '@japa/runner'

let podcastRepository: PodcastInMemoryRepository
let sut: PodcastDeleteUserCase

test.group('User > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    podcastRepository = new PodcastInMemoryRepository()
    sut = new PodcastDeleteUserCase(podcastRepository)
  })

  test('it should be able to delete a user', async ({ expect }) => {
    const created = await podcastRepository.create({
      content: 'Conteúdo completo da notícia',
      cover: 'Capa da noticia',
      date: '2023-01-01',
      description: 'Descrição completo da noticia',
      duration: '00:00:00',
      guests: ['Convidados'],
      presenters: ['Presentadores'],
      title: 'Titulo da noticia',
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await podcastRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
