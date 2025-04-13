import { Events, Paginated } from '#core/entity'
import { EventsContractRepository } from '#domain/event/repository'
import { EventsMapper } from './mapper.js'
import Model from '#infra/database/lucid/event/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'

export default class EventsLucidRepository implements EventsContractRepository {
  async create(payload: Events): Promise<Events> {
    const parsed = EventsMapper.toLucid(payload)
    const event = await Model.create(parsed)
    return EventsMapper.toDomain(event)
  }

  async save(payload: Events): Promise<Events> {
    const parsed = EventsMapper.toLucid(payload)
    const old = await Model.query().where('id', parsed.id).firstOrFail()
    const updated = await old.merge(parsed).save()
    return EventsMapper.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Events | null> {
    const event = await Model.query().where('id', id).first()
    if (!event) return null
    return EventsMapper.toDomain(event)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Events[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', payload?.search!))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map((item) => EventsMapper.toDomain(item))

    return { meta: json?.meta, data }
  }
}
