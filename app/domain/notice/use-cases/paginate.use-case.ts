import { Either, right } from '#core/either'
import { Notice, Paginated } from '#core/entity'
import { NoticeContractRepository } from '#domain/notice/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<Notice[]>>

@inject()
export default class NoticePaginateUseCase {
  constructor(private readonly noticeRepository: NoticeContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.noticeRepository.paginate(payload)
    return right(paginate)
  }
}
