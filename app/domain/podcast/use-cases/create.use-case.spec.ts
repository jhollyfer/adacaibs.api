import PodcastCreateUseCase from '#domain/podcast/use-cases/create.use-case'
import PodcastInMemoryRepository from '#tests/repositories/podcast'
import { test } from '@japa/runner'

let podcastRepository: PodcastInMemoryRepository
let sut: PodcastCreateUseCase

test.group('Podcast > Create > Use Case', (group) => {
  group.each.setup(async () => {
    podcastRepository = new PodcastInMemoryRepository()
    sut = new PodcastCreateUseCase(podcastRepository)
  })

  test('it should be able to create a podcast', async ({ expect }) => {
    const result = await sut.execute({
      content: 'Conteúdo completo da notícia',
      cover: 'Capa da noticia',
      date: '2023-01-01',
      description: 'Descrição completo da noticia',
      duration: '00:00:00',
      guests: ['Convidados'],
      presenters: ['Presentadores'],
      title: 'Titulo da noticia',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        content: 'Conteúdo completo da notícia',
        cover: 'Capa da noticia',
        date: '2023-01-01',
        description: 'Descrição completo da noticia',
        duration: '00:00:00',
        guests: ['Convidados'],
        presenters: ['Presentadores'],
        title: 'Titulo da noticia',
      })
    )
  })
})
