import AlbumCreateUseCase from '#domain/album/use-cases/create.use-case'
import AlbumInMemoryRepository from '#tests/repositories/album'
import { test } from '@japa/runner'

let albumRepository: AlbumInMemoryRepository
let sut: AlbumCreateUseCase

test.group('Album > Create > Use Case', (group) => {
  group.each.setup(async () => {
    albumRepository = new AlbumInMemoryRepository()
    sut = new AlbumCreateUseCase(albumRepository)
  })

  test('it should be able to create a album', async ({ expect }) => {
    const result = await sut.execute({
      cover: 'Capa do album',
      date: '2023-01-01',
      description: 'Descrição completo do album',
      images: ['Imagem 1', 'Imagem 2'],
      title: 'Titulo do album',
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
