import { Either, right } from '#core/either'
import { Events } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

import { EventSchema } from '#infra/http/validators/event.validator'

type Payload = Infer<(typeof EventSchema)['create']['body']>

type Result = Either<Error, Events>

@inject()
export default class EventCreateUseCase {
  constructor(private readonly eventRepository: EventContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const event: Events = payload

    await this.eventRepository.create(event)
    return right(event)
  }
}
