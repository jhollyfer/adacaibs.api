import { Either, right } from '#core/either'
import { Events } from '#core/entity'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { EventsContractRepository } from '../repository.js'
import { EventSchema } from '#infra/http/validators/event.validator'

type Payload = Infer<(typeof EventSchema)['create']['body']>

type Result = Either<Error, Events>

@inject()
export default class EventsCreateUseCase {
  constructor(private readonly eventRepository: EventsContractRepository) {}

  async execute(payload: Payload): Promise<Result> {
    const event: Events = payload

    await this.eventRepository.create(event)
    return right(event)
  }
}
