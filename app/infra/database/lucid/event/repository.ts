import { Events, Paginated } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import { EventMapper } from '#infra/database/lucid/event/mapper'
import Model from '#infra/database/lucid/event/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class EventLucidRepository implements EventContractRepository {
  async create(payload: Events): Promise<Events> {
    const parsed = EventMapper.toLucid(payload)
    const event = await Model.create(parsed)
    return EventMapper.toDomain(event)
  }

  async save(payload: Events): Promise<Events> {
    const parsed = EventMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return EventMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Events | null> {
    const event = await Model.query().where('id', id).first()
    if (!event) return null
    return EventMapper.toDomain(event)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Events[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', payload?.search!))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map((item) => EventMapper.toDomain(item))

    return { meta: json?.meta, data }
  }
}
