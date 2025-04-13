import { Either, left, right } from '#core/either'
import { EventSchema } from '#infra/http/validators/event.validator'
import { inject } from '@adonisjs/core'
import { Infer } from '@vinejs/vine/types'
import { EventsContractRepository } from '../repository.js'

type Result = Either<Error, null>
type Payload = Infer<(typeof EventSchema)['delete']['params']>
@inject()
export default class EventsDeleteUseCase {
  constructor(private readonly eventsRepository: EventsContractRepository) {}
  async execute(payload: Payload): Promise<Result> {
    const event = await this.eventsRepository.findById(payload.id)
    if (!event) return left(new Error('Evento não encontrada'))
    await this.eventsRepository.delete(payload.id)
    return right(null)
  }
}
