import { Either, right } from '#core/either'
import { Events, Paginated } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'

type Result = Either<null, Paginated<Events[]>>

@inject()
export default class EventPaginateUseCase {
  constructor(private readonly eventRepository: EventContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.eventRepository.paginate(payload)
    return right(paginate)
  }
}
