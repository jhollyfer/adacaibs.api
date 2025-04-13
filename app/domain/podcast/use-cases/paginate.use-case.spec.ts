import { Podcast } from '#core/entity'
import PodcastPaginateUseCase from '#domain/podcast/use-cases/paginate.use-case'
import PodcastInMemoryRepository from '#tests/repositories/podcast'
import { test } from '@japa/runner'

let podcastRepository: PodcastInMemoryRepository
let sut: PodcastPaginateUseCase

test.group('Podcast > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    podcastRepository = new PodcastInMemoryRepository()
    sut = new PodcastPaginateUseCase(podcastRepository)
  })

  test('it should be able to paginate podcasts', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const podcast: Podcast = {
        content: 'Conteúdo completo da notícia',
        cover: 'Capa da noticia',
        date: '2023-01-01',
        description: 'Descrição completo da noticia',
        duration: '00:00:00',
        guests: ['Convidados'],
        presenters: ['Presentadores'],
        title: 'Titulo da noticia',
      }
      await podcastRepository.create(podcast)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
