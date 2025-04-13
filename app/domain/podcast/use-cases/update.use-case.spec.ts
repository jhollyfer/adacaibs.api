import PodcastUpdateUseCase from '#domain/podcast/use-cases/update.use-case'
import PodcastInMemoryRepository from '#tests/repositories/podcast'
import { test } from '@japa/runner'

let podcastRepository: PodcastInMemoryRepository
let sut: PodcastUpdateUseCase

test.group('Podcast > Update > Use Case', (group) => {
  group.each.setup(async () => {
    podcastRepository = new PodcastInMemoryRepository()
    sut = new PodcastUpdateUseCase(podcastRepository)
  })

  test('it should be able to update a podcast', async ({ expect }) => {
    const podcast = await podcastRepository.create({
      content: 'Conteúdo completo da notícia',
      cover: 'Capa da noticia',
      date: '2023-01-01',
      description: 'Descrição completo da noticia',
      duration: '00:00:00',
      guests: ['Convidados'],
      presenters: ['Presentadores'],
      title: 'Titulo da noticia',
    })

    const result = await sut.execute({
      content: 'Conteúdo completo da notícia',
      cover: 'Capa da noticia',
      date: '2023-01-01',
      description: 'Descrição completo da noticia',
      duration: '00:00:00',
      guests: ['Convidados'],
      presenters: ['Presentadores'],
      title: 'Titulo da noticia',
      id: podcast.id!,
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
