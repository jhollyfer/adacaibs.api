import { NoticeCategory, NoticeStatus } from '#core/constant'
import { Notice } from '#core/entity'
import NoticePaginateUseCase from '#domain/notice/use-cases/paginate.use-case'
import NoticeInMemoryRepository from '#tests/repositories/notice'
import { test } from '@japa/runner'

let noticeRepository: NoticeInMemoryRepository
let sut: NoticePaginateUseCase

test.group('Notice > Paginate > Use Case', (group) => {
  group.each.setup(async () => {
    noticeRepository = new NoticeInMemoryRepository()
    sut = new NoticePaginateUseCase(noticeRepository)
  })

  test('it should be able to paginate notices', async ({ expect }) => {
    for (let index = 1; index <= 22; index++) {
      const notice: Notice = {
        category: NoticeCategory.EDUCATION,
        content: 'Conteúdo completo do evento',
        cover: 'Capa do evento',
        resume: 'Descrição completa do evento',
        status: NoticeStatus.DRAFT,
        title: 'Titulo do evento',
        tags: ['educação', 'tecnologia'],
      }
      await noticeRepository.create(notice)
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.data).toHaveLength(2)
  })
})
