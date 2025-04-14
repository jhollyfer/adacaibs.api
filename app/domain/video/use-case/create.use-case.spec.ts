import VideoCreateUseCase from '#domain/video/use-case/create.use-case'
import VideoInMemoryRepository from '#tests/repositories/video'
import { test } from '@japa/runner'

let videoRepository: VideoInMemoryRepository
let sut: VideoCreateUseCase

test.group('Video > Create > Use Case', (group) => {
  group.each.setup(async () => {
    videoRepository = new VideoInMemoryRepository()
    sut = new VideoCreateUseCase(videoRepository)
  })

  test('it should be able to create a video', async ({ expect }) => {
    const result = await sut.execute({
      date: '2023-01-01',
      description: 'Descrição completa do video',
      duration: '00:00:00',
      instructor: 'John Doe',
      thumbnail: 'https://example.com/thumbnail.jpg',
      title: 'Titulo do video',
      url: 'https://example.com/video.mp4',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        date: '2023-01-01',
        description: 'Descrição completa do video',
        duration: '00:00:00',
        instructor: 'John Doe',
        thumbnail: 'https://example.com/thumbnail.jpg',
        title: 'Titulo do video',
        url: 'https://example.com/video.mp4',
      })
    )
  })
})
