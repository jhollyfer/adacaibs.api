import { Either, left, right } from '#core/either'
import { NoticeContractRepository } from '#domain/notice/repository'
import { NoticeSchema } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof NoticeSchema)['delete']['params']>
@inject()
export default class NoticeDeleteUseCase {
  constructor(private readonly noticeRepository: NoticeContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const user = await this.noticeRepository.findById(payload.id)
    if (!user) return left(new Error('Noticia não encontrada'))
    await this.noticeRepository.delete(payload.id)
    return right(null)
  }
}
