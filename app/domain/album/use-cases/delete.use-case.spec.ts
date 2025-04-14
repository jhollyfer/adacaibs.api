import AlbumDeleteUseCase from '#domain/album/use-cases/delete.use-case'
import AlbumInMemoryRepository from '#tests/repositories/album'
import { test } from '@japa/runner'

let albumRepository: AlbumInMemoryRepository
let sut: AlbumDeleteUseCase

test.group('Album > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    albumRepository = new AlbumInMemoryRepository()
    sut = new AlbumDeleteUseCase(albumRepository)
  })

  test('it should be able to delete a album', async ({ expect }) => {
    const created = await albumRepository.create({
      cover: 'Capa do album',
      date: '2023-01-01',
      description: 'Descrição completo do album',
      images: ['Imagem 1', 'Imagem 2'],
      title: 'Titulo do album',
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await albumRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
