import { Video } from '#core/entity'
import VideoPaginateUseCase from '#domain/video/use-case/paginate.use-case'
import UserInMemoryRepository from '#tests/repositories/video'
import { test } from '@japa/runner'

let videoRepository: UserInMemoryRepository
let sut: VideoPaginateUseCase

test.group('Video > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    videoRepository = new UserInMemoryRepository()
    sut = new VideoPaginateUseCase(videoRepository)
  })

  test('it should be able to paginate videos', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const video: Video = {
        date: '2023-01-01',
        description: 'Descrição completa do video',
        duration: '00:00:00',
        instructor: 'John Doe',
        thumbnail: 'https://example.com/thumbnail.jpg',
        title: 'Titulo do video',
        url: 'https://example.com/video.mp4',
      }
      await videoRepository.create(video)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
