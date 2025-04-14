import { NoticeCategory, NoticeStatus } from '#core/constant'
import NoticeDeleteUseCase from '#domain/notice/use-cases/delete.use-case'
import NoticeInMemoryRepository from '#tests/repositories/notice'
import { test } from '@japa/runner'

let noticeRepository: NoticeInMemoryRepository
let sut: NoticeDeleteUseCase

test.group('Notice > Delete > Use Case', (group) => {
  group.each.setup(async () => {
    noticeRepository = new NoticeInMemoryRepository()
    sut = new NoticeDeleteUseCase(noticeRepository)
  })

  test('it should be able to delete a notice', async ({ expect }) => {
    const created = await noticeRepository.create({
      category: NoticeCategory.EDUCATION,
      content: 'Conteúdo completo do evento',
      cover: 'Capa do evento',
      resume: 'Descrição completa do evento',
      status: NoticeStatus.DRAFT,
      title: 'Titulo do evento',
      tags: ['educação', 'tecnologia'],
    })

    const result = await sut.execute({ id: created.id! })
    expect(result.isRight()).toBe(true)

    const user = await noticeRepository.findById(created.id!)
    expect(user).toBeNull()
  })
})
