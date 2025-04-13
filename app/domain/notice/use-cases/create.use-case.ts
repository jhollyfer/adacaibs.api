import { Either, right } from '#core/either'
import { Notice } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'
import { NoticeSchema } from '#infra/http/validators/notice.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Payload = Infer<(typeof NoticeSchema)['create']['body']>

type Result = Either<Error, Notice>

@inject()
export default class NoticeCreateUseCase {
  constructor(private readonly noticeRepository: NoticeContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const notice: Notice = {
      ...payload,
      tags: payload.tags || [],
    }

    await this.noticeRepository.create(notice)
    return right(notice)
  }
}
