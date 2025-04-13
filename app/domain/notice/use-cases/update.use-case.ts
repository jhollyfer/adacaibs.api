import { Either, left, right } from '#core/either'
import { Notice } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'
import { NoticeSchema } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof NoticeSchema)['update']['body']>
type Params = Infer<(typeof NoticeSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Notice>

@inject()
export default class NoticeUpdateUseCase {
  constructor(private readonly noticeRepository: NoticeContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const notice = await this.noticeRepository.findById(payload.id)

    if (!notice) return left(new Error('Noticia não encontrado'))

    Object.assign(notice, payload)

    await this.noticeRepository.save(notice)
    return right(notice)
  }
}
