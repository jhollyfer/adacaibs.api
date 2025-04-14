import VideoDeleteUseCase from '#domain/video/use-case/delete.use-case'
import VideoInMemoryRepository from '#tests/repositories/video'
import { test } from '@japa/runner'

let videoRepository: VideoInMemoryRepository
let sut: VideoDeleteUseCase

test.group('Video > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    videoRepository = new VideoInMemoryRepository()
    sut = new VideoDeleteUseCase(videoRepository)
  })

  test('it should be able to delete a video', async ({ expect }) => {
    const created = await videoRepository.create({
      date: '2023-01-01',
      description: 'Descrição completa do video',
      duration: '00:00:00',
      instructor: 'John Doe',
      thumbnail: 'https://example.com/thumbnail.jpg',
      title: 'Titulo do video',
      url: 'https://example.com/video.mp4',
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await videoRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
