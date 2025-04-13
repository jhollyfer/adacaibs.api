import { Either, right } from '#core/either'
import { Events, Paginated } from '#core/entity'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { inject } from '@adonisjs/core'
import { EventsContractRepository } from '../repository.js'

type Result = Either<null, Paginated<Events[]>>

@inject()
export default class EventsPaginateUseCase {
  constructor(private readonly eventsRepository: EventsContractRepository) {}

  async execute(payload: PaginationQuery): Promise<Result> {
    const paginate = await this.eventsRepository.paginate(payload)
    return right(paginate)
  }
}
