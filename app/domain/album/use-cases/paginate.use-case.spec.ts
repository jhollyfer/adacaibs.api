import { Album } from '#core/entity'
import AlbumPaginateUseCase from '#domain/album/use-cases/paginate.use-case'
import AlbumInMemoryRepository from '#tests/repositories/album'
import { test } from '@japa/runner'

let albumRepository: AlbumInMemoryRepository
let sut: AlbumPaginateUseCase

test.group('Album > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    albumRepository = new AlbumInMemoryRepository()
    sut = new AlbumPaginateUseCase(albumRepository)
  })

  test('it should be able to paginate albums', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const album: Album = {
        cover: 'Capa do album',
        date: '2023-01-01',
        description: 'Descrição completo do album',
        images: ['Imagem 1', 'Imagem 2'],
        title: 'Titulo do album',
      }
      await albumRepository.create(album)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
