import { NoticeCategory, NoticeStatus } from '#core/constant'
import NoticeCreateUseCase from '#domain/notice/use-cases/create.use-case'
import NoticeInMemoryRepository from '#tests/repositories/notice'
import { test } from '@japa/runner'

let noticeRepository: NoticeInMemoryRepository
let sut: NoticeCreateUseCase

test.group('Notice > Create > Use Case', (group) => {
  group.each.setup(async () => {
    noticeRepository = new NoticeInMemoryRepository()
    sut = new NoticeCreateUseCase(noticeRepository)
  })

  test('it should be able to create a notice', async ({ expect }) => {
    const result = await sut.execute({
      category: NoticeCategory.EDUCATION,
      content: 'Conteúdo completo do evento',
      cover: 'Capa do evento',
      resume: 'Descrição completa do evento',
      status: NoticeStatus.DRAFT,
      title: 'Titulo do evento',
      tags: ['educação', 'tecnologia'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(
      expect.objectContaining({
        category: NoticeCategory.EDUCATION,
        content: 'Conteúdo completo do evento',
        cover: 'Capa do evento',
        resume: 'Descrição completa do evento',
        status: NoticeStatus.DRAFT,
        title: 'Titulo do evento',
        tags: ['educação', 'tecnologia'],
      })
    )
  })
})
