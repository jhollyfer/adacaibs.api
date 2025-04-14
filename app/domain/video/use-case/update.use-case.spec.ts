import VideoUpdateUseCase from '#domain/video/use-case/update.use-case'
import VideoInMemoryRepository from '#tests/repositories/video'
import { test } from '@japa/runner'

let userRepository: VideoInMemoryRepository
let sut: VideoUpdateUseCase

test.group('Video > Update > Use Case', (group) => {
  group.each.setup(async () => {
    userRepository = new VideoInMemoryRepository()
    sut = new VideoUpdateUseCase(userRepository)
  })

  test('it should be able to update a video', async ({ expect }) => {
    const user = await userRepository.create({
      date: '2023-01-01',
      description: 'Descrição completa do video',
      duration: '00:00:00',
      instructor: 'John Doe',
      thumbnail: 'https://example.com/thumbnail.jpg',
      title: 'Titulo do video',
      url: 'https://example.com/video.mp4',
    })

    const result = await sut.execute({
      date: '2023-01-01',
      description: 'Descrição completa do video',
      duration: '00:00:00',
      instructor: 'John Doe',
      thumbnail: 'https://example.com/thumbnail.jpg',
      title: 'Titulo do video',
      url: 'https://example.com/video.mp4',
      id: user.id!,
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
