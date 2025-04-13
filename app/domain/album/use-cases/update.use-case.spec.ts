import AlbumUpdateUseCase from '#domain/album/use-cases/update.use-case'
import AlbumInMemoryRepository from '#tests/repositories/album'
import { test } from '@japa/runner'

let albumRepository: AlbumInMemoryRepository
let sut: AlbumUpdateUseCase

test.group('Album > Update > Use Case', (group) => {
  group.each.setup(async () => {
    albumRepository = new AlbumInMemoryRepository()
    sut = new AlbumUpdateUseCase(albumRepository)
  })

  test('it should be able to update a album', async ({ expect }) => {
    const album = await albumRepository.create({
      cover: 'Capa do album',
      date: '2023-01-01',
      description: 'Descrição completo do album',
      images: ['Imagem 1', 'Imagem 2'],
      title: 'Titulo do album',
    })

    const result = await sut.execute({
      cover: 'Capa do album',
      date: '2023-01-01',
      description: 'Descrição completo do album',
      images: ['Imagem 1', 'Imagem 2'],
      title: 'Titulo do album',
      id: album.id!,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        cover: 'Capa do album',
        date: '2023-01-01',
        description: 'Descrição completo do album',
        images: ['Imagem 1', 'Imagem 2'],
        title: 'Titulo do album',
      })
    )
  })
})
