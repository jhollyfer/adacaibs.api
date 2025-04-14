import { Either, left, right } from '#core/either'
import { Events } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import { EventSchema } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Body = Infer<(typeof EventSchema)['update']['body']>
type Params = Infer<(typeof EventSchema)['update']['params']>
interface Payload extends Body, Params {}
type Result = Either<Error, Events>

@inject()
export default class EventUpdateUseCase {
  constructor(private readonly eventRepository: EventContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const event = await this.eventRepository.findById(payload.id)

    if (!event) return left(new Error('Evento não encontrado'))

    Object.assign(event, payload)

    await this.eventRepository.save(event)
    return right(event)
  }
}
