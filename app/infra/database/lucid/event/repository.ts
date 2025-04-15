import { Events, Paginated, Payload } from '#core/entity'
import { EventContractRepository } from '#domain/event/repository'
import Model from '#infra/database/lucid/event/model'
import { PaginationQuery } from '#infra/http/validators/query.validator'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class EventLucidRepository implements EventContractRepository {
  async create(payload: Payload<Events>): Promise<Events> {
    const event = await Model.create(payload)
    return this.toDomain(event)
  }

  async save(payload: Payload<Events>): Promise<Events> {
    const old = await Model.query().where('id', payload?.id!).firstOrFail()
    const updated = await old
      .merge({
        ...old?.toJSON(),
        ...payload,
      })
      .save()
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await Model.query().where('id', id).delete()
  }

  async findById(id: string): Promise<Events | null> {
    const event = await Model.query().where('id', id).first()
    if (!event) return null
    return this.toDomain(event)
  }

  async paginate(payload: PaginationQuery): Promise<Paginated<Events[]>> {
    const page = Number(payload.page ?? 1)
    const perPage = Number(payload.perPage ?? 10)

    const result = await Model.query()
      .if(payload?.search, (q) => q.whereILike('title', `%${payload?.search}%`))
      .paginate(page, perPage)

    const json = result?.toJSON()

    const data = json?.data?.map(this.toDomain)

    return { meta: json?.meta, data }
  }

  private toDomain(raw: Model | ModelObject): Events {
    return {
      id: raw.id,
      title: raw.title,
      date: raw.date,
      hour: raw.hour,
      location: raw.location,
      address: raw.address,
      category: raw.category,
      capacity: raw.capacity,
      description: raw.description,
      detailedContent: raw.detailedContent,
      cover: raw.cover,
      ...(raw.createdAt && { createdAt: new Date(raw.createdAt) }),
      ...(raw.updatedAt && { updatedAt: new Date(raw.updatedAt) }),
    }
  }
}
