import { Either, left, right } from '#core/either'
import { EventContractRepository } from '#domain/event/repository'
import { EventSchema } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'

type Result = Either<Error, null>
type Payload = Infer<(typeof EventSchema)['delete']['params']>
@inject()
export default class EventDeleteUseCase {
  constructor(private readonly eventRepository: EventContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const event = await this.eventRepository.findById(payload.id)
    if (!event) return left(new Error('Evento não encontrada'))
    await this.eventRepository.delete(payload.id)
    return right(null)
  }
}
