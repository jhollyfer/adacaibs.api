import { NoticeCategory, NoticeStatus } from '#core/constant'
import NoticeUpdateUseCase from '#domain/notice/use-cases/update.use-case'
import NoticeInMemoryRepository from '#tests/repositories/notice'
import { test } from '@japa/runner'

let noticeRepository: NoticeInMemoryRepository
let sut: NoticeUpdateUseCase

test.group('Event > Update > Use Case', (group) => {
  group.each.setup(async () => {
    noticeRepository = new NoticeInMemoryRepository()
    sut = new NoticeUpdateUseCase(noticeRepository)
  })

  test('it should be able to update a notice', async ({ expect }) => {
    const event = await noticeRepository.create({
      category: NoticeCategory.EDUCATION,
      content: 'Conteúdo completo do evento',
      cover: 'Capa do evento',
      resume: 'Descrição completa do evento',
      status: NoticeStatus.DRAFT,
      title: 'Titulo do evento',
      tags: ['educação', 'tecnologia'],
    })

    const result = await sut.execute({
      category: NoticeCategory.EDUCATION,
      content: 'Conteúdo completo do evento',
      cover: 'Capa do evento',
      resume: 'Descrição completa do evento',
      status: NoticeStatus.DRAFT,
      title: 'Titulo do evento',
      tags: ['educação', 'tecnologia'],
      id: event.id!,
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
